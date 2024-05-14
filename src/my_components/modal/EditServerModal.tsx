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
import { isServerExist, updateServerInfo } from "@/lib/db";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerContext } from "@/components/providers/ServerInfoContext";
import { useDebouncedCallback } from "use-debounce";
function EditServerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isServerUnique, setIsServerUnique] = useState(false);
  const { user, isDialogBoxOpen, setIsDialogBoxOpen } =
    useUserContextProvider();
  const { serverShortInfo } = useServerContext();
  const { serverId }: { serverId: string } = useParams();
  const router = useRouter();

  const debounced = useCallback(
    useDebouncedCallback(async (value: string) => {
      const res = await isServerExist(value.trim());
      if (res) {
        setIsServerUnique(!res.success);
      }
    }, 1000),
    []
  );

  const fromSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
  });

  const methodForUseEffect = useCallback((name: string, imageUrl: string) => {
    if (name && imageUrl) {
      form.setValue("name", name);
      form.setValue("imageUrl", imageUrl);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    methodForUseEffect(
      serverShortInfo?.name || "",
      serverShortInfo?.imageUrl || ""
    );
  }, [serverShortInfo]);

  const form = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onOpenChange = useCallback(() => {
    setIsDialogBoxOpen({
      status: false,
      type: "Edit Server",
    });
  }, []);

  const onSubmit = useCallback(
    async (values: { name: string; imageUrl: string }) => {
      if (values.imageUrl && values.name) {
        if (
          values.name !== serverShortInfo?.name ||
          values.imageUrl !== serverShortInfo?.imageUrl
        ) {
          let res;
          if (values.name !== serverShortInfo?.name) {
            res = await updateServerInfo(serverId, {
              name: values.name,
            });
          } else if (values.imageUrl !== serverShortInfo?.imageUrl) {
            res = await updateServerInfo(serverId, {
              imageUrl: values.imageUrl,
            });
          } else {
            res = await updateServerInfo(serverId, {
              imageUrl: values.imageUrl,
              name: values.name,
            });
          }
          if (res.success) {
            router.refresh();
          }
        } else {
          setIsDialogBoxOpen({
            status: false,
            type: "Edit Server",
          });
        }
      } else {
        toast.error("Image is not uploaded");
      }
    },
    [user]
  );

  const isServerNameUnique = useCallback(
    async (e: string) => {
      if (e) {
        if (e !== serverShortInfo?.name) {
          debounced(e);
        } else {
          setIsServerUnique(true);
        }
      } else {
        setIsServerUnique(true);
      }
    },
    [serverShortInfo]
  );

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Edit Server" && isDialogBoxOpen.status}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            Edit your server
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
                          isServerNameUnique(e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute right-1 top-[50%]">
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(EditServerModal);
