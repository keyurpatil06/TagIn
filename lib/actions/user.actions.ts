'use server'

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient, } from "../appwrite.config";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    EVENT_COLLECTION_ID,
    USER_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

        if (!newUserAccount) throw new Error('Error creating new user')

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id
            }
        )

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set('appwrite-session', session.secret, {
            path: '',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async ({ email, password }: LoginUser) => {
    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        cookies().set('appwrite-session', session.secret, {
            path: '',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        const user = getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfo = async ({ userId }: { userId: string }) => {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
    )

    return parseStringify(user);
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id })

        return parseStringify(user);
    } catch (error) {
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete('appwrite-session');
        await account.deleteSession('current');
    } catch (error) {
        return null;
    }
}

export const registerForEvent = async (userId: string, eventId: string) => {
    return { success: true }
}