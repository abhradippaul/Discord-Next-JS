"use server";
import axios from "axios";
const db_url = process.env.DB_URL + "/api/v1/user";

export async function createUser(
  email: string,
  name: string,
  imageUrl: string
) {
  try {
    await fetch(`${db_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        imageUrl,
      }),
    });
    console.log("Creating user");
  } catch (err: any) {
    console.log("Error creating user ", err.message);
  }
}
