"use client";
import { memo, useCallback, useEffect } from "react";
import ServerHeader from "./ServerHeader";
import { getServerSidebarInfo } from "@/lib/db";
import { useServerContext } from "@/components/providers/ServerInfoContext";

function ServerSidebar({ serverId }: { serverId: string }) {
  const { setServerShortInfo, setServerMemberInfo, setServerMemberCount } =
    useServerContext();

  const methodForUseEffect = useCallback(async () => {
    const res = await getServerSidebarInfo(serverId);
    if (res.success) {
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
    }
  }, []);

  useEffect(() => {
    methodForUseEffect();
  }, []);

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader />
      ServerSidebar
    </div>
  );
}

export default memo(ServerSidebar);
