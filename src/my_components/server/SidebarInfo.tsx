import { Mic, Video } from "lucide-react";
import { memo } from "react";

interface SidebarInfoProps {
  _id: string;
  name: string;
  imageUrl?: string;
  type?: "TEXT" | "AUDIO" | "VIDEO";
}

function SidebarInfo({ _id, name, imageUrl, type }: SidebarInfoProps) {
  return (
    <div
      className={`flex items-center ${
        imageUrl && "justify-between"
      } cursor-pointer my-1 px-4 py-1 rounded-lg hover:bg-gray-800 transition`}
    >
      {type === "TEXT" && <h1 className="text-xl mr-2">#</h1>}
      {type === "AUDIO" && <Mic className="size-4 mr-2" />}
      {type === "VIDEO" && <Video className="size-4 mr-2" />}
      {imageUrl && (
        <img src={imageUrl} className="size-10 rounded-full" alt="image" />
      )}
      <h1>{name}</h1>
    </div>
  );
}

export default memo(SidebarInfo);
