import Image from "next/image";
import React from "react";

const Ticket = ({ event, userId }: { event: EventDetailsProps; userId: string }) => {
  const {
    title,
    date,
    time,
    location,
    price,
    organizedBy,
    bannerImageUrl,
    city,
  } = event;

  return (
    <div className="max-w-lg mx-auto bg-slate-100 shadow-lg rounded-lg overflow-hidden border border-gray-300">
      <div className="relative">
        <Image
          src={bannerImageUrl || "/default-ticket.jpg"}
          alt={title}
          width={800}
          height={500}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded">
          <p className="text-xs">{city}</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{organizedBy}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">Date:</span> {date}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Time:</span> {time}
          </p>
        </div>
        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Price:</span> ₹{price}
        </p>
      </div>
      <div className="p-4 bg-slate-300 border-t border-gray-300 text-center">
        {userId && (
          <p className="text-black">
            <span className='font-semibold text-red-600'>Ticket ID: </span>
            {userId}
          </p>
        )}
      </div>
    </div>
  );
};

export default Ticket;
