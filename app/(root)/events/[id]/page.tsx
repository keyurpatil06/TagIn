import { getEvent } from '@/lib/actions/event.actions'
import React from 'react'

type Props = {
  params: { id: string };
};

const IndividualEvent = async ({ params }: Props) => {
  const { id } = params;
  const event = await getEvent(id);

  if (!event) {
    return <div>Event not found.</div>
  }

  const { title, date, description, city } = event;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-500">{new Date(date).toLocaleDateString()}</p>
      <p className="text-lg mt-4">{description}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Event Details:</h2>
        <p className="text-gray-700">Location: {city}</p>
        {/* <p className="text-gray-700">Organizer: {organizer}</p> */}
      </div>
      <button
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Register
      </button>
    </div>
  )
}

export default IndividualEvent;
