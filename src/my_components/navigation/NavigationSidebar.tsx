"use client";

import dynamic from "next/dynamic";
import React, { memo, useCallback, useEffect, useState } from "react";
import NavigationAction from "./NavigationAction";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { ModeToggle } from "@/components/Mode-toggle";
import EachServerElement from "./EachServerElement";
import { Skeleton } from "@/components/ui/skeleton";

const CreateServerModal = dynamic(() => import("../modal/CreateServerModal"));

export interface ServerProps {
  role: string;
  ServerInfo: {
    imageUrl: string;
    name: string;
    _id: string;
  };
}

function NavigationSidebar() {
  const { user } = useUserContextProvider();
  const [servers, setServers] = useState<ServerProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { serverId }: { serverId: string } = useParams();
  const { setServerInfoPermission } = useUserContextProvider();

  const getUserAndServerInfo = useCallback(async (userEmail: string) => {
    if (userEmail) {
      const getUserInfo = (await import("@/lib/db")).getUserInfo;
      const res = await getUserInfo(userEmail);
      if (res.success) {
        setServers(res.data.Server);
        setIsLoading(false);
        const arr = res.data.Server.map((e: any) => ({
          _id: e.ServerInfo._id,
          role: e.role,
        }));
        setServerInfoPermission(arr);
      }
    }
  }, []);

  useEffect(() => {
    getUserAndServerInfo(user.email);
  }, [user]);

  return (
    <nav className="flex flex-col items-center min-h-dvh bg-[#E3E5E8] dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <CreateServerModal />
      <div className="w-10 h-[2px] rounded-md my-4 bg-zinc-300 dark:bg-zinc-700"></div>
      <ScrollArea className="w-full h-full">
        {isLoading ? (
          <div className="w-full my-4 flex items-center justify-center">
            <Skeleton className="size-12 rounded-full" />
          </div>
        ) : servers.length ? (
          servers.map((e) => (
            <EachServerElement
              _id={e.ServerInfo._id}
              serverId={serverId}
              name={e.ServerInfo.name}
              key={e.ServerInfo._id}
              imageUrl={e.ServerInfo.imageUrl}
            />
          ))
        ) : (
          <div></div>
        )}
      </ScrollArea>
      <ModeToggle />
      {isLoading ? (
        <div className="w-full mt-4 flex items-center justify-center">
          <Skeleton className="size-12 rounded-full" />
        </div>
      ) : (
        <img
          src={`${user.image}`}
          alt="image"
          className="size-12 mt-4 object-cover rounded-full"
        />
      )}
    </nav>
  );
}

export default memo(NavigationSidebar);
