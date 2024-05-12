"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserPermission } from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { memo, useCallback } from "react";

interface PropsValue {
  name: string;
  imageUrl: string;
  role: string;
  email: string;
  _id: string;
}

const roleTypes = ["Guest", "Moderator"];

function UserAvatar({ imageUrl, name, role, email, _id }: PropsValue) {
  const { serverId }: { serverId: string } = useParams();
  const router = useRouter();

  const onRoleChange = useCallback(
    async (role: string) => {
      const res = await updateUserPermission(serverId, _id, role);
      console.log(res);
      if (res.success) {
        router.refresh();
      }
    },
    [_id]
  );

  return (
    <div key={_id} className="w-full flex items-center justify-between my-4">
      <div className="flex items-center">
        <Avatar className={cn("size-8 md:size-12")}>
          <AvatarImage src={imageUrl} />
        </Avatar>
        <div className="flex flex-col ml-4">
          <div className="flex items-center">
            <h1>{name}</h1>
            {role === "Admin" && (
              <ShieldAlert className="size-4 ml-2 text-rose-500" />
            )}
            {role === "Moderator" && (
              <ShieldCheck className="size-4 ml-2 text-indigo-500" />
            )}
          </div>
          <p className="text-zinc-500">{email}</p>
        </div>
      </div>
      {role !== "Admin" && (
        <div className="w-16 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="size-4 text-zinc-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ShieldQuestion className="size-4 mr-2" />
                  <span>Role</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent sideOffset={5}>
                    {roleTypes.map((e) => (
                      <DropdownMenuItem key={e} onClick={() => onRoleChange(e)}>
                        <Shield className="size-4 mr-2" />
                        {e}
                        {role === e && <Check className="ml-auto" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Gavel className="size-4 mr-2" />
                Kick
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

export default memo(UserAvatar);
