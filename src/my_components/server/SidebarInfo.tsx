import ActionTooltip from "@/components/Action-tooltip";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { Edit, Mic, Trash, Video } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";

interface SidebarInfoProps {
  _id: string;
  name: string;
  imageUrl?: string;
  type?: "TEXT" | "AUDIO" | "VIDEO";
}

function SidebarInfo({ _id, name, imageUrl, type }: SidebarInfoProps) {
  const { serverId, channelId } = useParams();
  const { setIsDialogBoxOpen } = useUserContextProvider();
  const { serverRole } = useServerContext();

  const onEditClick = useCallback(() => {
    // setIsDialogBoxOpen({
    //   status: true,
    //   type: "edi",
    // })
  }, []);

  return (
    <div
      className={`flex items-center ${imageUrl ? "my-2" : "my-1"} ${
        channelId === _id
          ? "bg-zinc-700/20 dark:bg-zinc-700"
          : "hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      } cursor-pointer px-4 py-2 rounded-lg transition`}
    >
      <Link
        href={`/servers/${serverId}/${_id}`}
        className={`w-full flex items-center ${imageUrl && "justify-between"}`}
      >
        {type === "TEXT" && <h1 className="text-xl mr-2">#</h1>}
        {type === "AUDIO" && <Mic className="size-4 mr-2" />}
        {type === "VIDEO" && <Video className="size-4 mr-2" />}
        {imageUrl && (
          <img src={imageUrl} className="size-8 rounded-full" alt="image" />
        )}
        <p
          className={`font-semibold text-sm transition ${
            channelId === _id
              ? "text-primary dark:text-zinc-200 dark:group-hover:text-white"
              : "dark:text-zinc-400 dark:group-hover:text-zinc-300 group-hover:text-zinc-600  text-zinc-500"
          }`}
        >
          {name}
        </p>
      </Link>
      {!imageUrl && serverRole === "Admin" && (
        <div
          className="ml-auto flex items-center gap-x-2"
          onClick={onEditClick}
        >
          <ActionTooltip label="Edit" side="top">
            <Edit className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
}

export default memo(SidebarInfo);
