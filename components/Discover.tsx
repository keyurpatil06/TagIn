'use client'

import React from 'react';
import DiscoverCard from './DiscoverCard';
import { discoverCards } from '@/constants';
import Button from './Button';
import Link from 'next/link';

const Discover = () => {
  return (
    <div id='discover' className="min-h-screen bg-slate-950 text-white flex flex-col justify-center gap-6 items-center">
      <div className='text-center w-2/3 mt-10'>
        <h1 className="text-4xl font-semibold text-gray-100 mb-4">Discover Events</h1>
        <p className="text-lg text-gray-300">
          Explore exciting events tailored just for you. Choose your vibe, get your ticket, and join the fun!
        </p>
      </div>

      <main className="py-16 px-4 text-center mx-4">
        {/* Event Cards Section */}
        <div className="flex gap-6 md:flex-nowrap flex-wrap">
          {discoverCards.map(({ title, description, imgURL, alt }) => (
            <DiscoverCard key={title} title={title} description={description} imgURL={imgURL} alt={alt} />
          ))}
        </div>

        <Link href='/events'>
          <Button text='See What&apos;s Happening!' className='bg-slate-900 font-medium text-lg px-6 py-3 hover:bg-slate-800 tracking-wide mt-16' />
        </Link>
      </main>
    </div>
  );
};

export default Discover;
