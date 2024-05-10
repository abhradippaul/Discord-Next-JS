import ServerInfoContext from "@/components/providers/ServerInfoContext";
import NavigationSidebar from "@/my_components/navigation/NavigationSidebar";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-full">
      <ServerInfoContext>
        <div className="hidden md:flex h-full w-[72px] flex-col fixed inset-y-0 z-[50]">
          <NavigationSidebar />
        </div>
        <div className="md:pl-[72px]">{children}</div>
      </ServerInfoContext>
    </main>
  );
}

export default layout;
