"use server";

import axios, { AxiosError, AxiosResponse } from "axios";

const db_url_user = process.env.DB_URL + "/api/v1/user";
const db_url_server = process.env.DB_URL + "/api/v1/server";

export async function isTheUserExist(userEmail: string) {
  try {
    const { data } = await axios.get(`${db_url_user}/isExist/${userEmail}`);
    return data;
  } catch (err: any) {
    return {
      status: false,
      message: err.message,
    };
  }
}

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

export async function getServerSidebarInfo(serverId: string) {
  try {
    const { data } = await axios.get(db_url_server + "/sidebar/" + serverId);
    return data;
  } catch (err: any) {
    console.log("Error while fetching server info", err.message);
  }
}

export async function getInviteCode(serverId: string) {
  try {
    const { data } = await axios.get(db_url_server + "/invite/" + serverId);
    return data;
  } catch (err: any) {
    console.log("Error while fetching invite code", err.response.data.message);
  }
}

export async function checkIsTheUserAlreadyJoined(
  serverId: string,
  inviteCode: string,
  userEmail: string
) {
  try {
    const { data } = await axios.post(
      db_url_server + "/invite/" + serverId,
      {
        inviteCode: inviteCode,
        userEmail: userEmail,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  } catch (err: any) {
    console.log(
      "Error while verifying user invitation ",
      err.response.data.message
    );
  }
}

export async function createServerInviteCode(serverId: string) {
  try {
    const { data } = await axios.patch(db_url_server + "/invite/" + serverId);
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function joinToTheServer(userId: string, serverId: string) {
  try {
    const { data } = await axios.post(
      db_url_server + "/invite",
      {
        userId: userId,
        serverId: serverId,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function updateServerInfo(
  serverId: string,
  updatedData: { name?: string; imageUrl?: string }
) {
  try {
    const { data } = (await axios.patch(
      db_url_server + "/" + serverId,
      updatedData
    )) as AxiosResponse;
    return data;
  } catch (err) {
    const { message } = err as AxiosError;
    return message;
  }
}

export async function updateUserPermission(
  serverId: string,
  userId: string,
  role: string
) {
  try {
    const { data } = await axios.patch(
      db_url_server + "/user-permission/" + serverId,
      {
        userId,
        role,
      }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function leaveFromTheServer(serverId: string, userEmail: string) {
  try {
    const { data } = await axios.delete(db_url_server + "/leave/" + serverId, {
      data: {
        userEmail,
      },
    });
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function createChannel(
  serverId: string,
  name: string,
  type: string
) {
  try {
    const { data } = await axios.post(
      db_url_server + "/" + serverId + "/channel",
      {
        type,
        name,
      }
    );
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function deleteServer(serverId: string) {
  try {
    const { data } = await axios.delete(db_url_server + "/" + serverId);
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}

export async function deleteChannel(channelId: string, serverId: string) {
  try {
    const { data } = await axios.delete(
      db_url_server + "/" + serverId + "/channel/" + channelId
    );
    return data;
  } catch (err: any) {
    return err?.response?.data?.message;
  }
}
