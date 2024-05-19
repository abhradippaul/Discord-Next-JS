import ActionTooltip from "@/components/Action-tooltip";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { cn } from "@/lib/utils";
import { Edit, Lock, Mic, Trash, Video } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo, useCallback } from "react";

interface SidebarInfoProps {
  _id: string;
  name: string;
  imageUrl?: string;
  type?: "TEXT" | "AUDIO" | "VIDEO";
  email?: string;
}

function SidebarInfo({ _id, name, imageUrl, type, email }: SidebarInfoProps) {
  const {
    serverId,
    channelId,
    memberId,
  }: { serverId: string; channelId: string; memberId: string } = useParams();
  const { setIsDialogBoxOpen } = useUserContextProvider();
  const { serverRole, setServerChannelInfo } = useServerContext();

  const onEditClick = useCallback(() => {
    if (_id && name && type) {
      setIsDialogBoxOpen({
        status: true,
        type: "Edit Channel",
      });
      setServerChannelInfo({
        _id: _id,
        name: name,
        type: type,
      });
    }
  }, []);

  const onDeleteClick = useCallback(async () => {
    if (_id && name && type) {
      setIsDialogBoxOpen({
        status: true,
        type: "Delete Channel",
      });
      setServerChannelInfo({
        _id: _id,
        name: name,
        type: type,
      });
    }
  }, []);

  if (imageUrl) {
    return (
      <Link
        href={`/servers/${serverId}/${_id}`}
        className={cn(
          "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
          memberId === _id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
      >
        <img src={imageUrl} className="size-8 rounded-full" alt="image" />
        <p
          className={cn(
            "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            memberId === _id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {name}
        </p>
      </Link>
    );
  } else {
    return (
      <div
        className={`flex items-center ${
          channelId === _id
            ? "bg-zinc-700/20 dark:bg-zinc-700"
            : "hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
        } cursor-pointer px-4 py-2 group rounded-lg transition`}
      >
        <Link
          href={`/servers/${serverId}/${_id}`}
          className="w-full flex items-center"
        >
          {type === "TEXT" && <h1 className="text-xl mr-2">#</h1>}
          {type === "AUDIO" && <Mic className="size-4 mr-2" />}
          {type === "VIDEO" && <Video className="size-4 mr-2" />}

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
        {serverRole === "Admin" &&
          (name !== "general" ? (
            <div className="ml-auto items-center gap-x-2 hidden group-hover:flex">
              <ActionTooltip label="Edit" side="top">
                <Edit
                  className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                  onClick={onEditClick}
                />
              </ActionTooltip>
              <ActionTooltip label="Delete" side="top">
                <Trash
                  className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                  onClick={onDeleteClick}
                />
              </ActionTooltip>
            </div>
          ) : (
            <div className="ml-auto flex items-center gap-x-2">
              <Lock className="size-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </div>
          ))}
      </div>
    );
  }
}

export default memo(SidebarInfo);
