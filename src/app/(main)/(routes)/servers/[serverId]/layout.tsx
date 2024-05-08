import { getServerInfo } from "@/lib/db";
import ServerSidebar from "@/my_components/server/ServerSidebar";
import { ReactNode } from "react";

async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  // const data = await getServerInfo(params.serverId);
  // console.log(data);
  return (
    <div className="h-full z-[-10]">
      <div className="h-full w-60 fixed inset-y-0 hidden md:flex">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}

export default layout;
