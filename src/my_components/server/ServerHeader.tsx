"use client";
import { useUserContextProvider } from "@/components/providers/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";

function ServerHeader() {
  const { serverId } = useParams();
  const { userServer } = useUserContextProvider();
  const [serverRole, setServerRole] = useState("");
  useEffect(() => {
    if (serverId && userServer.length) {
      const role = userServer.find((e) => e._id === serverId);
      console.log(role);
      setServerRole(role?.role || "");
    }
  }, [serverId, userServer]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-full text-base font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          Server 1
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400"></DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ServerHeader);
