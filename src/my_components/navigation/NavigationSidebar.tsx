import React from "react";
import NavigationAction from "./NavigationAction";

async function NavigationSidebar() {
  return (
    <nav className="flex flex-col items-center min-h-dvh dark:bg-[#1E1F22] py-3">
      <NavigationAction />
    </nav>
  );
}

export default NavigationSidebar;
