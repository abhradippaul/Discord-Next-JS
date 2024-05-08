import ActionTooltip from "@/components/Action-tooltip";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { Plus } from "lucide-react";
import React, { memo } from "react";

function NavigationAction() {
  const { setIsDialogBoxOpen } = useUserContextProvider();
  return (
    <ActionTooltip label="Add a server" side="right" align="center">
      <div
        className="group"
        onClick={() =>
          setIsDialogBoxOpen({
            status: true,
            type: "Create Server",
          })
        }
      >
        <div className="flex items-center justify-center size-[48px] rounded-[24px] dark:bg-neutral-700 group-hover:rounded-[12px] group-hover:bg-emerald-600 transition-colors">
          <Plus className="text-emerald-600 transition-colors group-hover:text-white" />
        </div>
      </div>
    </ActionTooltip>
  );
}

export default memo(NavigationAction);
