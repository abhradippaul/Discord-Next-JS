"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect } from "react";

function page() {
  const { userServer } = useUserContextProvider();
  const router = useRouter();

  const routingToTheServer = useCallback((serverId: string) => {
    router.push("/servers/" + serverId);
  }, []);

  useEffect(() => {
    routingToTheServer(userServer[0]?._id);
    console.log("Checking from server page");
  }, [userServer]);

  return (
    <div className="w-full min-h-dvh flex items-center justify-center"></div>
  );
}

export default memo(page);
