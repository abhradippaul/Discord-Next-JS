"use client";

import { memo, useCallback, useEffect, useState } from "react";
import ServerHeader from "./ServerHeader";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./ServerSearch";
import SidebarDivision from "./SidebarDivision";
import SidebarInfo from "./SidebarInfo";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";
import { useUserContextProvider } from "@/components/providers/UserContext";
import ActionTooltip from "@/components/Action-tooltip";
import { Skeleton } from "@/components/ui/skeleton";

interface ChannelResponseValue {
  _id: "TEXT" | "AUDIO" | "VIDEO";
  count: number;
  Channel_Info: {
    _id: string;
    name: string;
  }[];
}

function ServerSidebar({ serverId }: { serverId: string }) {
  const {
    setServerShortInfo,
    setServerMemberInfo,
    setServerMemberCount,
    serverMemberInfo,
    serverMemberCount,
    serverRole,
    isChanged,
    setIsLoading,
    isLoading,
  } = useServerContext();
  const { setIsDialogBoxOpen, user } = useUserContextProvider();
  const [channelResponse, setChannelResponse] = useState<
    ChannelResponseValue[]
  >([]);

  const methodForUseEffect = useCallback(async () => {
    const getServerSidebarInfo = (await import("@/lib/db"))
      .getServerSidebarInfo;
    const res = await getServerSidebarInfo(serverId);
    if (res.success) {
      setServerShortInfo({
        imageUrl: res.data.imageUrl,
        name: res.data.name,
      });
      setServerMemberInfo(res.data.Server_Members);
      setServerMemberCount(res?.data?.Member_Count);
      setChannelResponse(res?.data?.Channel);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    methodForUseEffect();
  }, [isChanged]);

  const methodForOnClick = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Manage Member",
    });
  }, []);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader />
      <ScrollArea className="flex items-center w-full px-2 mt-2">
        <ServerSearch type="Channel" data={[]} />
        {isLoading ? (
          <div>
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="w-full my-2 flex flex-col">
              <div className="text-xs flex uppercase my-2 px-2 font-semibold text-zinc-500 dark:text-zinc-400 flex-col">
                TEXT CHANNELS
                <div className="w-full flex flex-col">
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                </div>
              </div>
              <div className="text-xs flex uppercase my-2 font-semibold text-zinc-500 dark:text-zinc-400 flex-col">
                AUDIO CHANNELS
                <div className="w-full flex flex-col">
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                </div>
              </div>
              <div className="text-xs flex uppercase my-2 font-semibold text-zinc-500 dark:text-zinc-400 flex-col">
                VOICE CHANNELS
                <div className="w-full flex flex-col">
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                  <Skeleton className="h-4 w-full rounded-md m-1" />
                </div>
              </div>
            </div>
          </div>
        ) : channelResponse.length ? (
          <div>
            <Separator className="bg-zinc-200 my-2 dark:bg-zinc-700 rounded-md" />
            {channelResponse.map((channel) => (
              <SidebarDivision
                key={channel._id}
                Channel_Info={channel.Channel_Info}
                _id={channel._id}
                count={channel.count}
              />
            ))}
          </div>
        ) : (
          <div></div>
        )}
        {isLoading ? (
          <div className="my-4 flex flex-col">
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="uppercase text-xs mt-4 text-zinc-500 font-semibold">
              members
            </div>
            <Skeleton className="h-8 w-full rounded-md m-2" />
          </div>
        ) : serverMemberCount ? (
          <div className="my-4">
            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="text-xs flex items-center justify-between uppercase my-4 font-semibold text-zinc-500 dark:text-zinc-400">
              Members
              {serverRole === "Admin" && (
                <ActionTooltip label="Manage Members" side="top">
                  <div
                    className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition cursor-pointer"
                    onClick={methodForOnClick}
                  >
                    <Settings className="size-4" />
                  </div>
                </ActionTooltip>
              )}
            </div>
            {serverMemberInfo?.map(
              (info) =>
                info.email !== user.email && (
                  <SidebarInfo
                    key={info._id}
                    _id={info._id}
                    name={info.name}
                    imageUrl={info.imageUrl}
                  />
                )
            )}
          </div>
        ) : (
          <div></div>
        )}
      </ScrollArea>
    </div>
  );
}

export default memo(ServerSidebar);
