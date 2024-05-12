"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";

function page() {
  const { serverInfoPermission } = useUserContextProvider();
  const router = useRouter();

  const routingToTheServer = useCallback((serverId: string) => {
    router.push("/servers/" + serverId);
  }, []);

  useEffect(() => {
    routingToTheServer(serverInfoPermission[0]?._id);
    console.log("Checking from server page");
  }, [serverInfoPermission]);

  return (
    <div className="w-full min-h-dvh flex items-center justify-center"></div>
  );
}

export default memo(page);
