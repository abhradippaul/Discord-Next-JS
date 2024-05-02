import ActionTooltip from "@/components/Action-tooltip";
import { Plus } from "lucide-react";
import React from "react";

function NavigationAction() {
  return (
    <ActionTooltip label="Add a server" side="right" align="center">
      <div className="group">
        <div className="flex items-center justify-center size-[48px] rounded-[24px] dark:bg-neutral-700 group-hover:rounded-[12px] group-hover:bg-emerald-600 transition-colors">
          <Plus className="text-emerald-600 transition-colors group-hover:text-white" />
        </div>
      </div>
    </ActionTooltip>
  );
}

export default NavigationAction;
