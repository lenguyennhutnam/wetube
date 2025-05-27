import { db } from "@/db";
import { categories } from "@/db/schema";

const categoryNames = [
  "Âm nhạc",
  "Trò chơi",
  "Danh sách kết hợp",
  "Podcast",
  "Trực tiếp",
  "Đọc rap",
  "Nhạc trẻ",
  "Trò chơi hành động phiêu lưu",
  "Thể thao",
  "Công nghệ",
  "Lịch sử",
  "Du lịch",
];

async function main() {
  console.log("Seeding categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories: ", error);
  }
}

main();
