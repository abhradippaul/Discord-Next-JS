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
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";

function DeleteChannelModel() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isDialogBoxOpen, setIsDialogBoxOpen } = useUserContextProvider();
  const { serverId }: { serverId: string } = useParams();
  const { setIsChanged, serverChannelInfo } = useServerContext();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onOpenChange = useCallback(() => {
    setIsDialogBoxOpen({
      status: false,
      type: "Delete Channel",
    });
  }, []);

  const onConfirmClick = useCallback(async () => {
    if (serverId && serverChannelInfo?._id) {
      setIsLoading(true);
      const deleteChannel = (await import("@/lib/db")).deleteChannel;
      const res = await deleteChannel(serverChannelInfo._id, serverId);
      if (res.success) {
        setIsLoading(false);
        setIsDialogBoxOpen({
          status: false,
          type: "Delete Channel",
        });
        setIsChanged((prev) => !prev);
      }
    }
  }, [serverChannelInfo]);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Delete Channel" && isDialogBoxOpen.status}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Delete Server
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-zinc-500">
          Are you sure you want to delete the channel
          <span className="font-semibold">{serverChannelInfo?.name}</span> ?
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

export default memo(DeleteChannelModel);
