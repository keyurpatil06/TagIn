'use server'

import { eventsList } from "../dummyData"

export const createEvent = async () => {

}

export const getEvent = async (id: string) => {
    const event = eventsList.find((event) => event.id === id)
    return event;
}

export const getEventsList = async () => {
    const events = eventsList;

    return events;
}