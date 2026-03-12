'use server';

import {  Query } from "node-appwrite";

import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";

export const getWorkspaces = async () => {
  try {
    const {databases, account} = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [Query.equal("userId", user.$id)]
    );
    
    if(members.total === 0){
        return {documents: [], total: 0};
    }
    
    const workspaceIds = members.documents.map((member) => member.workspaceId);
    
    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACES_ID,
        [
            Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIds)
        ],
    );
    // Convert Appwrite documents → plain objects
    const safeWorkspaces = workspaces.documents.map((workspace) => ({
      $id: workspace.$id,
      name: workspace.name,
      imageUrl: workspace.imageUrl ?? "",
      inviteCode: workspace.inviteCode ?? "",
      userId: workspace.userId ?? "",
    }));

    return {
      documents: safeWorkspaces,
      total: safeWorkspaces.length,
    };

  } catch (error) {
    console.error("Auth error:", error);
    return {documents: [], total: 0};
  }
};

interface GetWorkspaceProps{
  workspaceId: string;
};

export const getWorkspace = async ({workspaceId}: GetWorkspaceProps) => {
  try {
    const {databases, account} = await createSessionClient();
    const user = await account.get();

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId
    });

    if(!member) {
      return null;
    }

    const workspace = await databases.getDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId
    );

    // Convert Appwrite document → plain object
    const safeWorkspace: Workspace = {
      $id: workspace.$id,
      name: workspace.name,
      imageUrl: workspace.imageUrl ?? "",
      inviteCode: workspace.inviteCode ?? "",
      userId: workspace.userId ?? "",
    };

    return safeWorkspace;

  } catch (error) {
      console.error("Workspace fetch error:", error);
      return null;
  }
};