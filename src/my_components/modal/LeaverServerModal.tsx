"use client";

import { useServerContext } from "@/components/providers/ServerInfoContext";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { leaveFromTheServer } from "@/lib/db";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

function LeaverServerMdoal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isDialogBoxOpen, setIsDialogBoxOpen, user } =
    useUserContextProvider();
  const { serverId }: { serverId: string } = useParams();
  const { serverShortInfo } = useServerContext();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onOpenChange = useCallback(() => {
    setIsDialogBoxOpen({
      status: false,
      type: "Leave Server",
    });
  }, []);

  const onConfirmClick = useCallback(async () => {
    if (serverId && user?.email) {
      setIsLoading(true);
      const res = await leaveFromTheServer(serverId, user.email);
      if (res.success) {
        setIsLoading(false);
        router.push("/servers");
        router.refresh();
      }
    }
  }, [user]);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Leave Server" && isDialogBoxOpen.status}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Leave Server
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-zinc-500">
          Are you sure you want to leave{" "}
          <span className="font-semibold">{serverShortInfo?.name}</span> ?
        </DialogDescription>
        <DialogFooter className="w-full px-4">
          <div className="w-full flex items-center justify-between">
            <Button
              disabled={isLoading}
              onClick={onOpenChange}
              variant="destructive"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onConfirmClick}
              variant="primary"
            >
              {isLoading && <Loader2 className="size-6 mr-2 animate-spin" />}
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(LeaverServerMdoal);
