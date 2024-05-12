"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../file-upload";
import { Loader2 } from "lucide-react";
import { createServer, isServerExist } from "@/lib/db";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";

function CreateServerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isServerUnique, setIsServerUnique] = useState(true);
  const { user, isDialogBoxOpen, setIsDialogBoxOpen } =
    useUserContextProvider();
  const router = useRouter();

  const debounced = useCallback(
    useDebouncedCallback(async ({ name, imageUrl, email }) => {
      const res = await createServer(name, imageUrl, email);
      if (res.success) {
        router.push(`/servers/${res.data.isServerCreated._id}`);
      }
    }, 1000),
    []
  );

  const formSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(
    async (values: { name: string; imageUrl: string }) => {
      if (values.imageUrl && values.name) {
        debounced({
          name: values.name,
          imageUrl: values.imageUrl,
          email: user.email,
        });
      } else {
        toast.error("Image is not uploaded");
      }
    },
    [user]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Create Server" && isDialogBoxOpen.status}
      onOpenChange={() =>
        setIsDialogBoxOpen({
          status: false,
          type: "Create Server",
        })
      }
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center my-4 font-semibold">
            Give your server a unique name and add an image
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Toaster position="top-center" />
            <div className="my-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Image URL :</FormLabel>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server Name :</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Server name should be unique"
                        {...field}
                        className="bg-slate-100 text-black border-none outline-none"
                        onChange={async (e) => {
                          field.onChange(e);
                          if (e.target.value) {
                            const res = await isServerExist(
                              e.target.value.trim()
                            );
                            if (res) {
                              setIsServerUnique(!res.success);
                            }
                          } else {
                            setIsServerUnique(true);
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute right-0 top-[50%]">
                <img
                  src={`${isServerUnique ? "../wrong.png" : "../right.png"}`}
                  className="size-8"
                  alt=""
                />
              </div>
            </div>
            <DialogFooter className="mt-8 bg-slate-300">
              <Button
                variant="primary"
                className="w-full text-lg sm:text-xl"
                disabled={isLoading || isServerUnique}
              >
                {isLoading && <Loader2 className="animate-spin size-8 mr-4" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreateServerModal);
