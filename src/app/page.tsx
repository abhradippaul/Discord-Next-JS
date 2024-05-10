"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { createUser, isTheUserExist } from "@/lib/db";
import InitialModal from "@/my_components/modal/initial-modal";
import React, { useEffect } from "react";
function page() {
  const { user } = useUserContextProvider();
  useEffect(() => {
    (async () => {
      if (user.status !== "pending") {
        if (user.email) {
          const res = await isTheUserExist(user.email);
          console.log(res);
          if (!res.success) {
            await createUser(user.email, user.name, user.image);
          }
        }
      }
    })();
  }, [user]);
  return (
    <div>
      Create a server <InitialModal />
    </div>
  );
}

export default page;
