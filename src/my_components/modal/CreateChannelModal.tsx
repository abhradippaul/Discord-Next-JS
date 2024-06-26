"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
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
import { Loader2 } from "lucide-react";
import { useUserContextProvider } from "@/components/providers/UserContext";
import { useParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerContext } from "@/components/providers/ServerInfoContext";

function CreateServerModal() {
  const [isMounted, setIsMounted] = useState(false);
  const { isDialogBoxOpen, setIsDialogBoxOpen } = useUserContextProvider();
  const { serverId }: { serverId: string } = useParams();
  const { setIsChanged } = useServerContext();

  enum ChannelTypes {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
  }

  const formSchema = z.object({
    name: z.string(),
    type: z.nativeEnum(ChannelTypes),
  });

  useEffect(() => {
    setIsMounted(true);
    if (isDialogBoxOpen?.channelType) {
      form.setValue("type", ChannelTypes[isDialogBoxOpen.channelType]);
    }
  }, [isDialogBoxOpen]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelTypes.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(
    async (values: { name: string; type: ChannelTypes }) => {
      const createChannel = (await import("@/lib/db")).createChannel;
      const res = await createChannel(serverId, values.name, values.type);
      if (res?.success) {
        setIsDialogBoxOpen({
          status: false,
          type: "Create Channel",
        });
        form.reset();
        setIsChanged((prev) => !prev);
      }
    },
    []
  );

  const onOpenChange = useCallback(() => {
    setIsDialogBoxOpen({
      status: false,
      type: "Create Channel",
    });
    form.reset();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog
      open={isDialogBoxOpen.type === "Create Channel" && isDialogBoxOpen.status}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6">
          <DialogTitle className="text-center my-4 text-xl sm:text-2xl">
            CREATE CHANNEL
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Name :</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter a channel name"
                        {...field}
                        className="bg-slate-100 text-black border-none outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type : </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 text-black capitalize">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelTypes).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-8 bg-slate-300">
              <Button
                variant="primary"
                className="w-full text-lg sm:text-xl"
                disabled={
                  isLoading || !Boolean(form?.getValues("name")?.length)
                }
              >
                {isLoading && <Loader2 className="animate-spin size-4 mr-4" />}
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
