"use client";
import React, { useEffect, useState } from "react";
import NavigationAction from "./NavigationAction";
import { getUserInfo } from "@/lib/db";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActionTooltip from "@/components/Action-tooltip";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { ModeToggle } from "@/components/Mode-toggle";
import CreateServerModal from "../modal/CreateServerModal";

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
  const { serverId } = useParams();
  useEffect(() => {
    (async () => {
      if (user.email) {
        const res = await getUserInfo(user.email);
        console.log(res);
        if (res.success) {
          setServers(res.data.Server);
          setIsLoading(false);
        }
      }
    })();
  }, [user]);

  return (
    <nav className="flex flex-col items-center min-h-dvh dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <CreateServerModal />
      <div className="w-10 h-[2px] rounded-md my-4 bg-zinc-300 dark:bg-zinc-700"></div>
      <ScrollArea className="w-full h-full">
        {isLoading ? (
          <div className="w-full my-4 flex items-center justify-center">
            <Loader2 className="size-12 animate-spin" />
          </div>
        ) : (
          servers.length &&
          servers.map((e) => (
            <div
              key={e.ServerInfo._id}
              className="w-full relative my-4 flex items-center justify-center group"
            >
              <div
                className={`absolute left-0 w-1 bg-white ${
                  serverId === e.ServerInfo._id
                    ? "top-0 bottom-0 rounded-md"
                    : "top-[45%] bottom-[35%] rounded-full transition-[top,bottom] delay-100 group-hover:top-0 group-hover:rounded-md group-hover:bottom-0"
                }`}
              ></div>
              <ActionTooltip
                label={e.ServerInfo.name}
                align="center"
                side="right"
              >
                <Link href={`/servers/${e.ServerInfo._id}`}>
                  <img
                    src={`${e.ServerInfo.imageUrl}`}
                    alt="image"
                    className={`rounded-full size-12 object-cover ${
                      serverId !== e.ServerInfo._id && "hover:rounded-lg"
                    }`}
                  />
                </Link>
              </ActionTooltip>
            </div>
          ))
        )}
      </ScrollArea>
      <ModeToggle />
      {isLoading ? (
        <div className="w-full mt-4 flex items-center justify-center">
          <Loader2 className="size-12 animate-spin" />
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

export default NavigationSidebar;
