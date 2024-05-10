"use client";

import { useServerContext } from "@/components/providers/ServerInfoContext";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { createServerInviteCode } from "@/lib/db";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

function InviteModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isDialogBoxOpen, setIsDialogBoxOpen } = useUserContextProvider();
  const { serverId }: { serverId: string } = useParams();
  const { inviteLink, setInviteLink } = useServerContext();
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Invite People" && isDialogBoxOpen.status}
      onOpenChange={() => {
        setIsDialogBoxOpen({
          status: false,
          type: "Invite People",
        });
      }}
    >
      <DialogContent className="bg-white text-black">
        <Toaster />
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 py-2">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 my-4">
            Server invite link
          </Label>
          <div className="my-4 flex items-center justify-center">
            <Input
              type="text"
              className="bg-zinc-300/50 border-0 text-black"
              value={`${NEXT_PUBLIC_URL}/invite/${serverId}/${inviteLink}`}
              readOnly
            />
            {isLinkCopied ? (
              <Check className="size-4 ml-4" />
            ) : (
              <Copy
                className="size-4 ml-4 cursor-pointer"
                onClick={() => {
                  setIsLinkCopied(true);
                  navigator.clipboard.writeText(
                    `${NEXT_PUBLIC_URL}/invite/${serverId}/${inviteLink}`
                  );
                  setTimeout(() => {
                    setIsLinkCopied(false);
                  }, 1000);
                }}
              />
            )}
          </div>

          <Button
            variant="link"
            size="sm"
            className="text-black m-auto flex items-center justify-center"
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const response = await createServerInviteCode(serverId);
              if (response?.success) {
                setInviteLink(response.inviteCode);
                toast({
                  title: "Invite link generated successfully",
                  duration: 2000,
                });
              } else {
                toast({
                  title: response,
                  variant: "destructive",
                  duration: 2000,
                });
              }
              setIsLoading(false);
            }}
          >
            {" "}
            Generate a new link{" "}
            <RefreshCw
              className={`size-4 ml-4 ${isLoading && "animate-spin"}`}
            />{" "}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(InviteModal);
