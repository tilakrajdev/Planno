"use server";

import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async () => {
  try {
    // const client = new Client()
    //   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    //   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    // const cookieStore = await cookies();
    // const session = cookieStore.get(AUTH_COOKIE);

    // if (!session) return null;

    // client.setSession(session.value);

    // const account = new Account(client);
    // const user = await account.get();

    // // Return plain object
    // return {
    //   $id: user.$id,
    //   name: user.name,
    //   email: user.email,
    // };

    const {account} = await createSessionClient();

    return await account.get();
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};