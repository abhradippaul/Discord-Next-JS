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

interface ServerChannelInfoValue {
  _id: string;
  name: string;
  type: "TEXT" | "AUDIO" | "VIDEO";
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
  serverRole: "Admin" | "Moderator" | "Guest";
  setServerRole: Dispatch<SetStateAction<"Admin" | "Moderator" | "Guest">>;
  isChanged: boolean;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  serverChannelInfo: ServerChannelInfoValue | null;
  setServerChannelInfo: Dispatch<SetStateAction<ServerChannelInfoValue | null>>;
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
  serverRole: "Guest",
  setServerRole: () => {},
  isChanged: false,
  setIsChanged: () => {},
  isLoading: false,
  setIsLoading: () => {},
  serverChannelInfo: null,
  setServerChannelInfo: () => {},
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
  const [serverRole, setServerRole] = useState<"Admin" | "Moderator" | "Guest">(
    "Guest"
  );
  const [serverChannelInfo, setServerChannelInfo] =
    useState<ServerChannelInfoValue | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

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
        serverRole,
        setServerRole,
        isChanged,
        setIsChanged,
        isLoading,
        setIsLoading,
        serverChannelInfo,
        setServerChannelInfo,
      }}
    >
      {children}
    </ServerContextProvider>
  );
}

export default memo(ServerInfoContext);
