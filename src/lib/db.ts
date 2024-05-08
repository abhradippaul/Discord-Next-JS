"use server";

import axios from "axios";

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

export async function getUserInfo(userId: string) {
  try {
    const res = await fetch(`${db_url_user}/${userId}`);
    return await res.json();
  } catch (err: any) {
    console.log("Error white getting user info", err.message);
  }
}

export async function getServerInfo(serverId: string) {
  try {
    const res = await fetch(db_url_server + "/" + serverId);
    return await res.json();
  } catch (err: any) {
    console.log("Error while fetching server info", err.message);
  }
}

export async function getInviteCode(serverId: string) {
  try {
    const { data } = await axios.get(db_url_server + "/invite/" + serverId);
    return data;
  } catch (err: any) {
    console.log("Error while fetching invite code", err.message);
  }
}

export async function checkIsTheUserAlreadyJoined(
  serverId: string,
  inviteCode: string,
  userEmail: string
) {
  console.log(serverId,inviteCode,userEmail);
  try {
    const res = await axios.post(db_url_server + "/invite/" + serverId, {
      data: {
        inviteCode: inviteCode,
        userEmail: userEmail,
      },
    });
    console.log(res);
    return res;
  } catch (err: any) {
    console.log("Error while verifying user invitation ", err.message);
  }
}

export async function joinToTheServer(userId: string, serverId: string) {
  try {
    const { data } = await axios.get(db_url_server, {
      data: {
        userId: userId,
        serverId: serverId,
      },
    });
    return data;
  } catch (err: any) {
    console.log("Error while verifying user invitation ", err.message);
  }
}
