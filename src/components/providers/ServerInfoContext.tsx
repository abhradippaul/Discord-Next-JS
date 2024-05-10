"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ServerInfoContextValue {
  inviteLink: string;
  setInviteLink: Dispatch<SetStateAction<string>>;
}

const ServerContext = createContext<ServerInfoContextValue>({
  inviteLink: "",
  setInviteLink: () => {},
});

const ServerContextProvider = ServerContext.Provider;

export function useServerContext() {
  return useContext(ServerContext);
}

function ServerInfoContext({ children }: { children: ReactNode }) {
  const [inviteLink, setInviteLink] = useState<string>("");
  return (
    <ServerContextProvider value={{ inviteLink, setInviteLink }}>
      {children}
    </ServerContextProvider>
  );
}

export default ServerInfoContext;
