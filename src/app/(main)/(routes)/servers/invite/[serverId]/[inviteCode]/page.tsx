"use client";

import { useUserContextProvider } from "@/components/providers/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { checkIsTheUserAlreadyJoined, joinToTheServer } from "@/lib/db";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ServerResponseValue {
  success?: boolean;
  message: string;
  data?: {
    userId?: string;
  };
}

function page() {
  const { serverId, inviteCode }: { serverId: string; inviteCode: string } =
    useParams();
  const [serverResponse, setServerResponse] = useState<ServerResponseValue>();
  const [isMounter, setIsMounted] = useState(false);
  const { user } = useUserContextProvider();
  useEffect(() => {
    (async () => {
      if (serverId && inviteCode && user.email) {
        const response = await checkIsTheUserAlreadyJoined(
          serverId,
          inviteCode,
          user.email
        );
        setServerResponse(response);
      }
    })();
    setIsMounted(true);
  }, [user]);

  if (!isMounter) {
    return null;
  }

  // if (!serverResponse?.success) {
  //   return (
  //     <Dialog open>
  //       <DialogContent className="bg-white text-black">
  //         <DialogHeader className="px-6">
  //           <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
  //             Are you want to join ?
  //           </DialogTitle>
  //         </DialogHeader>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Are you want to join ?
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default page;
