"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

interface PropValue {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

function FileUpload({ endpoint, value, onChange }: PropValue) {
  return (
    <UploadDropzone
    className="border bg-blue-400"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
      }}
      onUploadError={(err) => {
        console.log(err);
      }}
    />
  );
}

export default FileUpload;
