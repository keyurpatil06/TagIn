'use server'

import { InputFile } from "node-appwrite/file";
import { eventsList } from "../dummyData"
import { createAdminClient } from "../appwrite.config";
import { ID } from "node-appwrite";
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
        USER_COLLECTION_ID!,
        ID.unique(),
        {
            bannerImageId: file?.$id || null,
            bannerImageUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...eventData,
        }
    )

    console.log(newEvent);
    

    return parseStringify(newEvent);
}

export const getEvent = async (id: string) => {
    const event = eventsList.find((event) => event.$id === id)
    return event;
}

export const getEventsList = async () => {
    const events = eventsList;

    return events;
}