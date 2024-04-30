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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../file-upload";
import { CldUploadWidget } from "next-cloudinary";
import { Loader2 } from "lucide-react";

function InitialModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [imageInfo, setImageInfo] = useState({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: { name: string; imageUrl: any }) => {
    console.log(values);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-8 bg-slate-300">
              <Button
                variant="primary"
                className="w-full text-lg sm:text-xl"
                disabled={isLoading}
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

export default InitialModal;
