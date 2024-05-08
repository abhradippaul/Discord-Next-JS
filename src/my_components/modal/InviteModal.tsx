"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getInviteCode } from "@/lib/db";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

function InviteModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const { isDialogBoxOpen, setIsDialogBoxOpen } = useUserContextProvider();
  const { serverId }: { serverId: string } = useParams();
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

  useEffect(() => {
    if (serverId) {
      (async () => {
        setIsMounted(true);
        const data = await getInviteCode(serverId);
        setInviteCode(
          `${NEXT_PUBLIC_URL}/servers/invite/${serverId}/${data.inviteCode}`
        );
      })();
    }
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
              value={inviteCode}
              readOnly
            />
            {isLinkCopied ? (
              <Check className="size-4 ml-4" />
            ) : (
              <Copy
                className="size-4 ml-4 cursor-pointer"
                onClick={() => {
                  setIsLinkCopied(true);
                  navigator.clipboard.writeText(inviteCode);
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
            onClick={() => setIsLoading(true)}
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
