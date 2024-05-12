"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  memo,
  useContext,
  useState,
} from "react";

interface ServerShortInfoValue {
  name: string;
  imageUrl: string;
}

interface ServerInfoContextValue {
  inviteLink: string;
  setInviteLink: Dispatch<SetStateAction<string>>;
  serverShortInfo: ServerShortInfoValue | null;
  setServerShortInfo: Dispatch<SetStateAction<ServerShortInfoValue | null>>;
}

const ServerContext = createContext<ServerInfoContextValue>({
  inviteLink: "",
  setInviteLink: () => {},
  serverShortInfo: null,
  setServerShortInfo: () => {},
});

const ServerContextProvider = ServerContext.Provider;

export function useServerContext() {
  return useContext(ServerContext);
}

function ServerInfoContext({ children }: { children: ReactNode }) {
  const [inviteLink, setInviteLink] = useState<string>("");
  const [serverShortInfo, setServerShortInfo] =
    useState<ServerShortInfoValue | null>(null);
  return (
    <ServerContextProvider
      value={{
        inviteLink,
        setInviteLink,
        serverShortInfo,
        setServerShortInfo,
      }}
    >
      {children}
    </ServerContextProvider>
  );
}

export default memo(ServerInfoContext);
