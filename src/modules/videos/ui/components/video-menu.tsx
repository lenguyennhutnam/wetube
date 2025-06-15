import {
  ListPlusIcon,
  MoreVerticalIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { APP_URL } from "@/constants";

interface VideoMenuProps {
  videoId: string;
  variant?: "ghost" | "secondary";
  onRemove?: () => void;
}

export const VideoMenu = ({
  videoId,
  variant = "ghost",
  onRemove,
}: VideoMenuProps) => {
  const onShare = () => {
    const fullUrl = `${APP_URL || "http://localhost:3000"}/videos/${videoId}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Copy link thành công");
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic để thêm vào playlist
    console.log("Thêm vào danh sách phát:", videoId);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
    console.log("Removing video:", videoId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className="rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVerticalIcon className="h-4 w-4" />
          <span className="sr-only">Mở menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={onShare}>
          <ShareIcon className="mr-2 h-4 w-4" />
          Chia sẻ
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddToPlaylist}>
          <ListPlusIcon className="mr-2 h-4 w-4" />
          Thêm vào danh sách phát
        </DropdownMenuItem>
        {onRemove && (
          <DropdownMenuItem onClick={handleRemove}>
            <Trash2Icon className="mr-2 h-4 w-4" />
            Remove
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
