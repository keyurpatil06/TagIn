import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EventCard = ({ $id, title, date, city, description, imgURL }: EventDetails) => {

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform w-96 flex flex-col">
      <Image
        src={imgURL}
        alt={title}
        height={500}
        width={500}
        className=" w-full rounded-xl"
      />
      <h2 className="text-xl font-bold text-white mt-3">{title}</h2>
      <h2 className="text-base font-semibold text-gray-300 mt-3">{date}</h2>
      <h2 className="text-base font-semibold text-gray-300 mt-1">{city}</h2>
      <p className="text-gray-400 my-2 line-clamp-2">{description}</p>
      <Link
        href={`/events/${$id}`}
        className='bg-red-500 text-white font-semibold w-full p-2 rounded-xl mt-1 text-center text-lg'
      >
        Register Now!
      </Link>
    </div>
  );
};

export default EventCard;
