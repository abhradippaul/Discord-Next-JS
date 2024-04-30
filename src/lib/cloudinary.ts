import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function cloudinaryUpload(imageData:any,folderName: string) {
  try {
    return await cloudinary.v2.uploader.upload(imageData,{
        folder : folderName
    });
  } catch (err: any) {
    console.log("Error in cloudinary upload: ", err.message);
    return err
  }
}
