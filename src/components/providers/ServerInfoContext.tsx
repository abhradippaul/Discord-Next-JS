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
interface ServerMemberInfoValue {
  _id: string;
  role: string;
  name: string;
  imageUrl: string;
  email: string;
}

interface ServerInfoContextValue {
  inviteLink: string;
  setInviteLink: Dispatch<SetStateAction<string>>;
  serverShortInfo: ServerShortInfoValue | null;
  setServerShortInfo: Dispatch<SetStateAction<ServerShortInfoValue | null>>;
  serverMemberInfo: ServerMemberInfoValue[] | null;
  setServerMemberInfo: Dispatch<SetStateAction<ServerMemberInfoValue[] | null>>;
  serverMemberCount: number;
  setServerMemberCount: Dispatch<SetStateAction<number>>;
}

const ServerContext = createContext<ServerInfoContextValue>({
  inviteLink: "",
  setInviteLink: () => {},
  serverShortInfo: null,
  setServerShortInfo: () => {},
  serverMemberInfo: null,
  setServerMemberInfo: () => {},
  serverMemberCount: 0,
  setServerMemberCount: () => {},
});

const ServerContextProvider = ServerContext.Provider;

export function useServerContext() {
  return useContext(ServerContext);
}

function ServerInfoContext({ children }: { children: ReactNode }) {
  const [inviteLink, setInviteLink] = useState<string>("");

  const [serverShortInfo, setServerShortInfo] =
    useState<ServerShortInfoValue | null>(null);

  const [serverMemberInfo, setServerMemberInfo] = useState<
    ServerMemberInfoValue[] | null
  >(null);

  const [serverMemberCount, setServerMemberCount] = useState(0);

  return (
    <ServerContextProvider
      value={{
        inviteLink,
        setInviteLink,
        serverShortInfo,
        setServerShortInfo,
        serverMemberInfo,
        setServerMemberInfo,
        serverMemberCount,
        setServerMemberCount,
      }}
    >
      {children}
    </ServerContextProvider>
  );
}

export default memo(ServerInfoContext);
