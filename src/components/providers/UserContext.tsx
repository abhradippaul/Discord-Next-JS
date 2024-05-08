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

interface UserServerValue {
  _id: string;
  role: string;
}

interface DialogBoxValue {
  type: "Create Server" | "Invite People" | null;
  status: boolean;
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
  userServer: UserServerValue[];
  setUserServer: Dispatch<SetStateAction<UserServerValue[]>>;
}

const CustomUserContext = createContext<UserContextValue>({
  user: {
    email: "",
    status: "pending",
    name: "",
    image: "",
  },
  isDialogBoxOpen: {
    type: null,
    status: false,
  },
  setIsDialogBoxOpen: () => {},
  userServer: [
    {
      _id: "",
      role: "",
    },
  ],
  setUserServer: () => {},
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
    type: null,
    status: false,
  });
  const [userServer, setUserServer] = useState<UserServerValue[]>([]);
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
        userServer,
        setUserServer,
      }}
    >
      {children}
    </UserContextProvider>
  );
}

export default memo(UserContext);
