import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdir, readFile, mkdir, writeFile, unlink, rm } from "fs/promises";
import { spawn } from "child_process";
import path from "path";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_API_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || "3bbb1e649dc59cb2a46a53de8942569e",
    secretAccessKey: process.env.R2_SECRET_KEY || "9f15b603c3cdb5f1fc80c06adc6d165fff332c23b2454ae68ac51b34d6ae941e",
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());

  // 🔐 Generate unique folder name to avoid overwriting
  const baseName = path.parse(file.name).name;
  const fileName = `${baseName}-${Date.now()}-${randomUUID()}`;

  const localFolder = path.join("/tmp", fileName);
  await mkdir(localFolder, { recursive: true });

  const inputPath = path.join(localFolder, file.name);
  await writeFile(inputPath, bytes);

  const outputPath = path.join(localFolder, "output.m3u8");

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i", inputPath,
      "-c:v", "libx264",
      "-c:a", "aac",
      "-strict", "-2",
      "-hls_time", "10",
      "-hls_list_size", "0",
      "-f", "hls",
      outputPath,
    ]);

    ffmpeg.stderr.on("data", (data) => console.log("ffmpeg:", data.toString()));

    ffmpeg.on("close", async (code) => {
      if (code !== 0) {
        return reject(NextResponse.json({ error: "FFmpeg failed" }, { status: 500 }));
      }

      try {
        await unlink(inputPath);

        const files = (await readdir(localFolder)).filter(
          (name) => name.endsWith(".m3u8") || name.endsWith(".ts")
        );

        await Promise.all(
          files.map(async (name) => {
            const body = await readFile(path.join(localFolder, name));
            await r2.send(
              new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: `${fileName}/${name}`,
                Body: body,
                ContentType: name.endsWith(".ts")
                  ? "video/MP2T"
                  : "application/x-mpegURL",
              })
            );
          })
        );

        await rm(localFolder, { recursive: true, force: true });

        const publicUrl = `${process.env.R2_BASE_URL}/${fileName}/output.m3u8`;
        console.log(publicUrl);
        resolve(NextResponse.json({ success: true, videoUrl: publicUrl }));
      } catch (err) {
        console.error("Upload failed", err);
        reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
      }
    });
  });
}
