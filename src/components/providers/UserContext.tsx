"use client";

import { UserContextValueInterface } from "@/helper/customInterface";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CustomUserContext = createContext({
  user: {
    email: "",
    status: "pending",
    name: "",
    image: "",
  },
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
  return <UserContextProvider value={{ user }}>{children}</UserContextProvider>;
}

export default UserContext;
