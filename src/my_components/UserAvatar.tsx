"use client";

import { useServerContext } from "@/components/providers/ServerInfoContext";
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
import { leaveFromTheServer, updateUserPermission } from "@/lib/db";
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
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, memo, useCallback, useState } from "react";

interface PropsValue {
  name: string;
  imageUrl: string;
  role: string;
  email: string;
  _id: string;
  setCheck: Dispatch<SetStateAction<boolean>>;
}

const roleTypes = ["Guest", "Moderator"];

function UserAvatar({
  imageUrl,
  name,
  role,
  email,
  _id,
  setCheck,
}: PropsValue) {
  const { serverId }: { serverId: string } = useParams();
  const [onChangeMemberRole, setOnChangeMemberRole] = useState<string>(role);
  const [onKickMember, setOnKickMember] = useState<string>();
  const { setServerMemberCount } = useServerContext();

  const onRoleChange = useCallback(async (role: string) => {
    const res = await updateUserPermission(serverId, _id, role);
    if (res.success) {
      setOnChangeMemberRole(role);
      setCheck(true);
    }
  }, []);

  const onKickFromTheServer = useCallback(async () => {
    const res = await leaveFromTheServer(serverId, _id);
    if (res.success) {
      setOnKickMember(_id);
      setServerMemberCount((prev) => prev - 1);
      setCheck(true);
    }
  }, []);

  return (
    onKickMember !== _id && (
      <div key={_id} className="w-full flex items-center justify-between my-4">
        <div className="flex items-center">
          <Avatar className={cn("size-8 md:size-12")}>
            <AvatarImage src={imageUrl} />
          </Avatar>
          <div className="flex flex-col ml-4">
            <div className="flex items-center">
              <h1>{name}</h1>
              {onChangeMemberRole === "Admin" && (
                <ShieldAlert className="size-4 ml-2 text-rose-500" />
              )}
              {onChangeMemberRole === "Moderator" && (
                <ShieldCheck className="size-4 ml-2 text-indigo-500" />
              )}
            </div>
            <p className="text-zinc-500">{email}</p>
          </div>
        </div>
        {onChangeMemberRole !== "Admin" && (
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
                        <DropdownMenuItem
                          key={e}
                          onClick={() => onRoleChange(e)}
                        >
                          <Shield className="size-4 mr-2" />
                          {e}
                          {onChangeMemberRole === e && (
                            <Check className="ml-auto" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onKickFromTheServer}>
                  <Gavel className="size-4 mr-2" />
                  Kick
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    )
  );
}

export default memo(UserAvatar);
