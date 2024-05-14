"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";
import { getInviteCode } from "@/lib/db";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import ManageMemberModal from "../modal/ManageMemberModal";
import CreateChannelModal from "../modal/CreateChannelModal";
// import InviteModal from "../modal/InviteModal";
// import EditServerModal from "../modal/EditServerModal";
const EditServerModal = React.lazy(() => import("../modal/EditServerModal"));
const InviteModal = React.lazy(() => import("../modal/InviteModal"));

function ServerHeader() {
  const { serverId }: { serverId: string } = useParams();
  const [serverRole, setServerRole] = useState("");
  const { setIsDialogBoxOpen, serverInfoPermission } = useUserContextProvider();
  const { setInviteLink, serverShortInfo, inviteLink } = useServerContext();

  const methodForUseEffect = useCallback((userServer: any) => {
    if (serverId && userServer.length) {
      const role = userServer.find((e: any) => e._id === serverId);
      setServerRole(role?.role || "");
    }
  }, []);

  useEffect(() => {
    methodForUseEffect(serverInfoPermission);
  }, [serverInfoPermission]);

  const onClickInvitePeople = useCallback(async () => {
    const data = await getInviteCode(serverId);
    if (data?.success) {
      setInviteLink(data.inviteCode);
    }
    setIsDialogBoxOpen({
      status: true,
      type: "Invite People",
    });
  }, []);

  const onClickServerSettings = useCallback(async () => {
    setIsDialogBoxOpen({
      status: true,
      type: "Edit Server",
    });
  }, []);

  const onClickManageMember = useCallback(async () => {
    setIsDialogBoxOpen({
      status: true,
      type: "Manage Member",
    });
  }, []);

  const onClickCreateChannel = useCallback(async () => {
    setIsDialogBoxOpen({
      status: true,
      type: "Create Channel",
    });
  }, []);

  return (
    <DropdownMenu>
      {serverRole !== "Guest" && <InviteModal />}
      {serverRole === "Admin" && <EditServerModal />}
      <ManageMemberModal />
      <CreateChannelModal />
      <DropdownMenuTrigger>
        <div className="w-full text-base font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {serverShortInfo?.name}
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400">
        {serverRole !== "Guest" && (
          <DropdownMenuItem
            onClick={onClickInvitePeople}
            className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 px-3 py-3 text-sm cursor-pointer"
          >
            Invite People <UserPlus className="size-4" />{" "}
          </DropdownMenuItem>
        )}
        {serverRole === "Admin" && (
          <DropdownMenuItem
            onClick={onClickServerSettings}
            className="px-3 py-2 text-sm cursor-pointer flex items-center justify-between"
          >
            Server Settings <Settings className="size-4" />{" "}
          </DropdownMenuItem>
        )}
        {serverRole === "Admin" && (
          <DropdownMenuItem
            onClick={onClickManageMember}
            className="px-3 flex items-center justify-between py-2 text-sm cursor-pointer"
          >
            Manage Members <Users className="size-4" />
          </DropdownMenuItem>
        )}
        {serverRole !== "Guest" && (
          <DropdownMenuItem
            onClick={onClickCreateChannel}
            className="px-3 py-2 flex items-center justify-between text-sm cursor-pointer"
          >
            Create Channel <PlusCircle className="size-4" />
          </DropdownMenuItem>
        )}
        {serverRole !== "Guest" && <DropdownMenuSeparator />}
        {serverRole === "Admin" && (
          <DropdownMenuItem className="px-3 text-rose-500 py-2 flex items-center justify-between text-sm cursor-pointer">
            Delete Server <Trash2 className="size-4" />
          </DropdownMenuItem>
        )}
        {serverRole !== "Admin" && (
          <DropdownMenuItem className="px-3 py-2 text-rose-500 flex items-center justify-between text-sm cursor-pointer">
            Leave Server <LogOut className="size-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ServerHeader);
