import { memo, useCallback } from "react";
import SidebarInfo from "./SidebarInfo";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { Plus } from "lucide-react";
import ActionTooltip from "@/components/Action-tooltip";
import { useServerContext } from "@/components/providers/ServerInfoContext";

interface ChannelResponseValue {
  _id: "TEXT" | "AUDIO" | "VIDEO";
  count: number;
  Channel_Info: {
    _id: string;
    name: string;
  }[];
}
function SidebarDivision({ _id, count, Channel_Info }: ChannelResponseValue) {
  const { setIsDialogBoxOpen } = useUserContextProvider();
  const { serverRole } = useServerContext();

  const methodForOnClick = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Create Channel",
    });
  }, []);

  return (
    <div className="w-full my-2">
      <div className="text-xs flex items-center justify-between uppercase my-4 font-semibold text-zinc-500 dark:text-zinc-400">
        {_id} Channels
        {serverRole === "Admin" && (
          <ActionTooltip label="Create Channel" side="top">
            <div
              className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition cursor-pointer"
              onClick={methodForOnClick}
            >
              <Plus className="size-4" />
            </div>
          </ActionTooltip>
        )}
      </div>
      {Channel_Info.map((info) => (
        <SidebarInfo
          _id={info._id}
          key={info._id}
          name={info.name}
          type={_id}
        />
      ))}
    </div>
  );
}

export default memo(SidebarDivision);
