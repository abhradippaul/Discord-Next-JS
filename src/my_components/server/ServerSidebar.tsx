"use client";
import { memo, useCallback, useEffect, useState } from "react";
import ServerHeader from "./ServerHeader";
import { getServerSidebarInfo } from "@/lib/db";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ServerSearch from "./ServerSearch";
import SidebarDivision from "./SidebarDivision";
import SidebarInfo from "./SidebarInfo";
import { Separator } from "@/components/ui/separator";

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
  } = useServerContext();
  const [channelResponse, setChannelResponse] = useState<
    ChannelResponseValue[]
  >([]);

  const methodForUseEffect = useCallback(async () => {
    const res = await getServerSidebarInfo(serverId);
    if (res.success) {
      console.log(res);
      setServerShortInfo({
        imageUrl: res.data.imageUrl,
        name: res.data.name,
      });

      const newArr = res.data.Server_Members.map((e: any) => ({
        _id: e.UserInfo._id,
        email: e.UserInfo.email,
        name: e.UserInfo.name,
        role: e.role,
        imageUrl: e.UserInfo.imageUrl,
      }));

      setServerMemberInfo(newArr);
      setServerMemberCount(res?.data?.Member_Count);
      setChannelResponse(res?.data?.Channel);
    }
  }, []);

  useEffect(() => {
    methodForUseEffect();
  }, []);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader />
      <ScrollArea className="flex items-center w-full px-2 mt-2">
        <h1 className="mb-4 text-xl font-semibold text-center">Channel</h1>
        <ServerSearch type="Channel" data={[]} />
        {channelResponse.map((channel) => (
          <SidebarDivision
            key={channel._id}
            Channel_Info={channel.Channel_Info}
            _id={channel._id}
            count={channel.count}
          />
        ))}
        <Separator className="bg-white" />
        <div className="my-4">
          <h1 className="my-2 text-xl text-center font-semibold">
            Member {serverMemberCount}
          </h1>
          {serverMemberInfo?.map((info) => (
            <SidebarInfo
              key={info._id}
              _id={info._id}
              name={info.name}
              imageUrl={info.imageUrl}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default memo(ServerSidebar);
