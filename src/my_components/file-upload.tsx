"use client";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import Image from "next/image";

interface PropValue {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
}

function FileUpload({ endpoint, value, onChange }: PropValue) {
  const fileType = value.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative mx-auto size-20">
        <Image alt="Upload" src={value} fill sizes="full" className="rounded-full object-cover" />
      </div>
    );
  }
  return (
    <UploadDropzone
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
