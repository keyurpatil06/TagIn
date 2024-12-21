'use server'

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
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

export const createEvent = async ({ bannerImage, ...eventData }: EventDetails) => {
    const { database, storage } = await createAdminClient();
    let file;

    if (bannerImage) {
        const inputFile = InputFile.fromBuffer(
            bannerImage?.get('blobFile') as Blob,
            bannerImage?.get('fileName') as string,
        )

        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newEvent = await database.createDocument(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        ID.unique(),
        {
            bannerImageId: file?.$id || null,
            bannerImageUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            user: eventData.userId,
            ...eventData,
        }
    )

    return parseStringify(newEvent);
}

export const getEvent = async (eventId: string) => {
    const { database } = await createAdminClient();

    const event = await database.getDocument(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        eventId
    );

    return parseStringify(event)
}

export const getEventsCreatedByUser = async (userId: string) => {
    const { database } = await createAdminClient();

    const events = await database.listDocuments(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        [Query.equal('userId', [userId]), Query.orderDesc('$createdAt')]
    );

    return parseStringify(events.documents)
}

export const getEventsUsersRegisteredFor = async (userId: string) => {
    const { database } = await createAdminClient();

    const events = await database.listDocuments(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        [Query.search('registeredUsers', userId)]
    );

    return parseStringify(events.documents);
}

export const getEventsList = async () => {
    const { database } = await createAdminClient();

    const events = await database.listDocuments(
        DATABASE_ID!,
        EVENT_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]
    );

    return parseStringify(events.documents);
}