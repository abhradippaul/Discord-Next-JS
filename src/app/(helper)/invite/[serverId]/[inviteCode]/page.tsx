"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { checkIsTheUserAlreadyJoined } from "@/lib/db";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServerResponseValue {
  success?: boolean;
  message: string;
  data?: {
    userId?: string;
  };
}

function page() {
  const { serverId, inviteCode }: { serverId: string; inviteCode: string } =
    useParams();
  const [serverResponse, setServerResponse] = useState<ServerResponseValue>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUserContextProvider();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (serverId && inviteCode && user.email) {
        const response = await checkIsTheUserAlreadyJoined(
          serverId,
          inviteCode,
          user.email
        );
        if (response?.message === "Already Joined") {
          router.push("/servers/" + serverId);
        }
        setServerResponse(response);
        setIsLoading(false);
      }
    })();
    setIsMounted(true);
  }, [user]);

  if (!isMounted) {
    return null;
  }

  return (
    !isLoading && (
      <Dialog open={serverResponse?.message !== "Already Joined"}>
        <DialogContent className="bg-white text-black">
          <DialogHeader className="px-6">
            <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
              Are you want to join ?
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  );
}

export default page;
