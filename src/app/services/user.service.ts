import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getAllUsers: async function (page = 1, limit = 10) {
    const cookieStore = await cookies();
    const res = await fetch(
      `${API_URL}/admin/users?page=${page}&limit=${limit}`,
      {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["users"] },
      },
    );
    return await res.json();
  },

  updateUserStatus: async function (
    userId: string,
    payload: { status?: string; role?: string },
  ) {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return { success: false, message: "Backend update failed" };
    return await res.json();
  },

  deleteUser: async function (userId: string) {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (!res.ok)
      return { success: false, message: "Delete operation failed on server" };
    return await res.json();
  },
};
