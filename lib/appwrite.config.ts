'use server'

import { Client, Account, Databases, Users, Storage } from "node-appwrite";
import { cookies } from "next/headers";

const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    EVENT_COLLECTION_ID,
    USER_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// Create Session-Based Client
export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(ENDPOINT!)
        .setProject(PROJECT_ID!);

    const session = cookies().get("appwrite-session");
    if (!session || !session.value) {
        throw new Error("No session found");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

// Create Admin-Based Client
export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(ENDPOINT!)
        .setProject(PROJECT_ID!).setKey(API_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        },
        get storage(){
            return new Storage(client);
        }
    };
}
