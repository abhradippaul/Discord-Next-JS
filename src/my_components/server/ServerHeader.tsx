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
import { memo, useEffect, useState } from "react";
import InviteModal from "../modal/InviteModal";

function ServerHeader() {
  const { serverId } = useParams();
  const { userServer } = useUserContextProvider();
  const [serverRole, setServerRole] = useState("");
  const { setIsDialogBoxOpen } = useUserContextProvider();

  useEffect(() => {
    if (serverId && userServer.length) {
      const role = userServer.find((e) => e._id === serverId);
      setServerRole(role?.role || "");
    }
  }, [serverId, userServer]);

  return (
    <DropdownMenu>
      <InviteModal />
      <DropdownMenuTrigger>
        <div className="w-full text-base font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          Server 1
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400">
        {serverRole !== "Guest" && (
          <DropdownMenuItem
            onClick={() => {
              setIsDialogBoxOpen({
                status: true,
                type: "Invite People",
              });
            }}
            className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 px-3 py-3 text-sm cursor-pointer"
          >
            Invite People <UserPlus className="size-4" />{" "}
          </DropdownMenuItem>
        )}
        {serverRole === "Admin" && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer flex items-center justify-between">
            Settings <Settings className="size-4" />{" "}
          </DropdownMenuItem>
        )}
        {serverRole === "Admin" && (
          <DropdownMenuItem className="px-3 flex items-center justify-between py-2 text-sm cursor-pointer">
            Manage Members <Users className="size-4" />
          </DropdownMenuItem>
        )}
        {serverRole !== "Guest" && (
          <DropdownMenuItem className="px-3 py-2 flex items-center justify-between text-sm cursor-pointer">
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
