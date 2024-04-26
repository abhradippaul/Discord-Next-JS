"use client";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { createUser } from "@/lib/db";
import { findTheUser } from "@/lib/initial-profile";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
function page() {
  const { user } = useUserContextProvider();
  useEffect(() => {
    (async () => {
      if (user.status !== "pending") {
        if (user.email) {
          const res = await findTheUser(user.email);
          console.log(res);
          if (!res.success) {
            await createUser(user.email, user.name, user.image);
            console.log("User created successfully");
          }
        }
      }
    })();
  }, [user]);
  return <div>Create a server</div>;
}

export default page;
