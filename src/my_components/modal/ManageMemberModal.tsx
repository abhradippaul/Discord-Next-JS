"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { memo, useCallback, useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";
import { useServerContext } from "@/components/providers/ServerInfoContext";

function ManageMemberModel() {
  const [isMounted, setIsMounted] = useState(false);
  const { isDialogBoxOpen, setIsDialogBoxOpen } = useUserContextProvider();
  const { serverMemberInfo, serverMemberCount, setIsChanged } =
    useServerContext();
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onOpenChange = useCallback(() => {
    setIsDialogBoxOpen({
      status: false,
      type: "Manage Member",
    });
    setIsChanged(check);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Manage Member" && isDialogBoxOpen.status}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {serverMemberCount} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 w-full max-h-[420px]">
          {serverMemberInfo?.map((data) => (
            <UserAvatar
              key={data._id}
              _id={data._id}
              imageUrl={data.imageUrl}
              name={data.name}
              role={data.role}
              email={data.email}
              setCheck={setCheck}
            />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ManageMemberModel);
