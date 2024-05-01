"use server";
const db_url_user = process.env.DB_URL + "/api/v1/user";
const db_url_server = process.env.DB_URL + "/api/v1/server";

export async function createUser(
  email: string,
  name: string,
  imageUrl: string
) {
  try {
    await fetch(`${db_url_user}`, {
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

export async function isServerExist(name: string) {
  try {
    const res = await fetch(`${db_url_server}/${name.toString()}/isExist`, {
      method: "GET",
    });
    return await res.json();
  } catch (err: any) {
    console.log("Error white checking is the server exists", err.message);
  }
}

export async function createServer(
  name: string,
  imageUrl: string,
  userEmail: string
) {
  try {
    const res = await fetch(`${db_url_server}/${userEmail}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        imageUrl,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.log("The error while creating the server ", err.message);
  }
}
