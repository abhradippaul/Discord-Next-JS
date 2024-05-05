import { memo } from "react";
import ServerHeader from "./ServerHeader";

function ServerSidebar({ serverId }: { serverId: string }) {

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader />
      ServerSidebar
    </div>
  );
}

export default memo(ServerSidebar);
