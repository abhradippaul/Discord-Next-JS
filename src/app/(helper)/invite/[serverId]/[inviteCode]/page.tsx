"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { checkIsTheUserAlreadyJoined, joinToTheServer } from "@/lib/db";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

interface ServerResponseValue {
  success?: boolean;
  message: string;
  userId?: string;
  serverInfo?: {
    name: string;
    imageUrl?: string;
    Member_Count: number;
  };
}

function page() {
  const { serverId, inviteCode }: { serverId: string; inviteCode: string } =
    useParams();
  const [serverResponse, setServerResponse] = useState<ServerResponseValue>();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const { user } = useUserContextProvider();
  const router = useRouter();

  const getServerResponse = useCallback(async (userEmail: string) => {
    if (serverId && inviteCode && userEmail) {
      const response = await checkIsTheUserAlreadyJoined(
        serverId,
        inviteCode,
        userEmail
      );
      if (response?.message === "Already Joined") {
        router.push("/servers/" + serverId);
      } else if (response?.success) {
        setServerResponse(response);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getServerResponse(user.email);
    setIsMounted(true);
  }, [user]);

  const onBtnClick = useCallback(async () => {
    if (serverResponse?.userId && serverId) {
      setIsLoadingBtn(true);
      const response = await joinToTheServer(serverResponse.userId, serverId);
      if (response?.success) {
        setIsLoadingBtn(false);
        router.push("/servers/" + serverId);
      }
    }
  }, [serverResponse]);

  if (!isMounted) {
    return null;
  }

  return (
    !isLoading && (
      <Dialog open={serverResponse?.message !== "Already Joined"}>
        <DialogContent className="bg-white text-black px-6">
          <DialogHeader>
            <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
              Are you want to join ?
            </DialogTitle>
            <div className="w-full flex flex-col items-center my-4">
              <img
                src={serverResponse?.serverInfo?.imageUrl}
                alt="Server image"
                className="rounded-full mb-4 size-16 object-cover"
              />
              <div className="flex items-center justify-between w-[70%] mt-4">
                <div className="text-lg text-green-600 font-semibold">
                  <span className="text-black">Member Count : </span>
                  {serverResponse?.serverInfo?.Member_Count}
                </div>
                <h1 className="text-xl text-gray-700 font-bold">
                  {serverResponse?.serverInfo?.name}
                </h1>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isLoading}
              size="lg"
              className="text-xl"
              variant="primary"
              onClick={onBtnClick}
            >
              {isLoading ? <Loader2 className="size-8 animate-spin" /> : "Join"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}

export default memo(page);
