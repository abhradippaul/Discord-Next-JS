"use client";

import dynamic from "next/dynamic";
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
import React, { memo, useCallback, useEffect } from "react";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { Skeleton } from "@/components/ui/skeleton";

const EditChannelModel = dynamic(() => import("../modal/EditChannelModel"), {
  ssr: false,
});
const DeleteChannelModel = dynamic(
  () => import("../modal/DeleteChannelModel"),
  {
    ssr: false,
  }
);
const InviteModal = dynamic(() => import("../modal/InviteModal"), {
  ssr: false,
});
const EditServerModal = dynamic(() => import("../modal/EditServerModal"), {
  ssr: false,
});
const ManageMemberModal = dynamic(() => import("../modal/ManageMemberModal"), {
  ssr: false,
});
const CreateChannelModal = dynamic(
  () => import("../modal/CreateChannelModal"),
  { ssr: false }
);
const LeaverServerModal = dynamic(() => import("../modal/LeaverServerModal"), {
  ssr: false,
});
const DeleteServerModal = dynamic(() => import("../modal/DeleteServerModal"), {
  ssr: false,
});

function ServerHeader() {
  const { serverId }: { serverId: string } = useParams();
  const { setIsDialogBoxOpen, serverInfoPermission } = useUserContextProvider();
  const {
    setInviteLink,
    serverShortInfo,
    setServerRole,
    serverRole,
    isLoading,
  } = useServerContext();

  const methodForUseEffect = useCallback((userServer: any) => {
    if (serverId && userServer.length) {
      const role = userServer.find((e: any) => e._id === serverId);
      setServerRole(role?.role);
    }
  }, []);

  useEffect(() => {
    methodForUseEffect(serverInfoPermission);
  }, [serverInfoPermission]);

  const onClickInvitePeople = useCallback(async () => {
    const getInviteCode = (await import("@/lib/db")).getInviteCode;
    const data = await getInviteCode(serverId);
    if (data?.success) {
      setInviteLink(data.inviteCode);
    }
    setIsDialogBoxOpen({
      status: true,
      type: "Invite People",
    });
  }, []);

  const onClickServerSettings = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Edit Server",
    });
  }, []);

  const onClickManageMember = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Manage Member",
    });
  }, []);

  const onClickCreateChannel = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Create Channel",
    });
  }, []);

  const onClickLeaverServer = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Leave Server",
    });
  }, []);

  const onClickDeleteServer = useCallback(() => {
    setIsDialogBoxOpen({
      status: true,
      type: "Delete Server",
    });
  }, []);

  return (
    <DropdownMenu>
      {serverRole !== "Guest" && (
        <div>
          <InviteModal />
          <CreateChannelModal />
        </div>
      )}
      {serverRole === "Admin" ? (
        <div>
          <EditServerModal />
          <DeleteServerModal />
          <ManageMemberModal />
          <DeleteChannelModel />
          <EditChannelModel />
        </div>
      ) : (
        <LeaverServerModal />
      )}

      <DropdownMenuTrigger>
        <div className="w-full text-base font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {!isLoading ? (
            serverShortInfo?.name
          ) : (
            <Skeleton className="flex-grow align-baseline h-6 mr-6" />
          )}
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
          <DropdownMenuItem
            onClick={onClickDeleteServer}
            className="px-3 text-rose-500 py-2 flex items-center justify-between text-sm cursor-pointer"
          >
            Delete Server <Trash2 className="size-4" />
          </DropdownMenuItem>
        )}
        {serverRole !== "Admin" && (
          <DropdownMenuItem
            onClick={onClickLeaverServer}
            className="px-3 py-2 text-rose-500 flex items-center justify-between text-sm cursor-pointer"
          >
            Leave Server <LogOut className="size-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ServerHeader);
