import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = (req: Request) => {
  console.log(req);
  return {
    userId: 123,
  };
};

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"]).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
