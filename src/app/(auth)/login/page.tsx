"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function page() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isLoadingGitHub, setIsLoadingGitHub] = useState<boolean>(false);
  return (
    <main className="w-[90%] max-w-[500px] h-[50%] flex flex-col justify-around border shadow-lg dark:shadow-gray-700 rounded-lg px-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
        Login
      </h1>
      <h3 className="sm:text-lg font-semibold">to continue to discord</h3>
      <div className="w-full h-1/2 flex items-center flex-col justify-around">
        <Button
          onClick={() => {
            setIsLoadingGoogle(true);
            signIn("google").finally(() => {
              setIsLoadingGoogle(false);
            });
          }}
          disabled={isLoadingGoogle}
          size="lg"
          className="w-full text-xl"
        >
          {isLoadingGoogle ? (
            <Loader2 className="animate-spin size-6 mr-4" />
          ) : (
            <img src="google.png" className="size-6 mr-4" alt="Google" />
          )}
          Continue with Google
        </Button>
        <Button
          onClick={() => {
            setIsLoadingGitHub(true);
            signIn("github").finally(() => {
              setIsLoadingGitHub(false);
            });
          }}
          disabled={isLoadingGitHub}
          size="lg"
          className="w-full text-xl"
        >
          {isLoadingGitHub ? (
            <Loader2 className="animate-spin size-6 mr-4" />
          ) : (
            <img src="github.png" className="size-6 mr-4" alt="GitHub" />
          )}
          Continue with GitHub
        </Button>
      </div>
    </main>
  );
}

export default page;
