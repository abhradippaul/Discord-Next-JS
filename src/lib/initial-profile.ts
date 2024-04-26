"use server";

import axios from "axios";

const url = "http://localhost/api/v1/user";

export async function findTheUser(userEmail: string) {
  try {
    // const response = await axios.get(`${url}/${userEmail}`);
    const res = await fetch(`${url}/${userEmail}`);
    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      status: false,
      message: err.message,
    };
  }
}
