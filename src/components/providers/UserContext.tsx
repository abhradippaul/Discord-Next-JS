"use client";

import { UserContextValueInterface } from "@/helper/customInterface";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";

interface ServerInfoPermission {
  _id: string;
  role: string;
}

interface DialogBoxValue {
  type:
    | "Create Server"
    | "Invite People"
    | "Edit Server"
    | "Manage Member"
    | "Create Channel"
    | "Leave Server"
    | "Delete Server"
    | "Delete Channel"
    | "Edit Channel";
  status: boolean;
  channelType?: "TEXT" | "AUDIO" | "VIDEO";
}

interface UserContextValue {
  user: {
    email: string;
    image: string;
    name: string;
    status: string;
  };
  isDialogBoxOpen: DialogBoxValue;
  setIsDialogBoxOpen: Dispatch<SetStateAction<DialogBoxValue>>;
  serverInfoPermission: ServerInfoPermission[] | [];
  setServerInfoPermission: Dispatch<
    SetStateAction<ServerInfoPermission[] | []>
  >;
}

const CustomUserContext = createContext<UserContextValue>({
  user: {
    email: "",
    status: "pending",
    name: "",
    image: "",
  },
  isDialogBoxOpen: {
    type: "Create Server",
    status: false,
  },
  setIsDialogBoxOpen: () => {},
  serverInfoPermission: [],
  setServerInfoPermission: () => {},
});

const UserContextProvider = CustomUserContext.Provider;

export const useUserContextProvider = () => {
  return useContext(CustomUserContext);
};

function UserContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextValueInterface>({
    email: "",
    image: "",
    name: "",
    status: "pending",
  });
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState<DialogBoxValue>({
    type: "Create Server",
    status: false,
  });
  const [serverInfoPermission, setServerInfoPermission] = useState<
    ServerInfoPermission[] | []
  >([]);

  const data = useSession();
  useEffect(() => {
    if (data.status !== "loading") {
      setUser({
        email: data.data?.user?.email || "",
        image: data.data?.user?.image || "",
        name: data.data?.user?.name || "",
        status: data.status,
      });
    }
  }, [data]);
  return (
    <UserContextProvider
      value={{
        user,
        isDialogBoxOpen,
        setIsDialogBoxOpen,
        serverInfoPermission,
        setServerInfoPermission,
      }}
    >
      {children}
    </UserContextProvider>
  );
}

export default memo(UserContext);
