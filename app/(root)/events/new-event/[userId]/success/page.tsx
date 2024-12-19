import { getEventsCreatedByUser } from '@/lib/actions/event.actions';
import Link from 'next/link';
import React from 'react';

const Success = async ({ params: { userId } }: SearchParamProps) => {
  const events = await getEventsCreatedByUser(userId)
  const latestEvent = events[0]

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-200'>
      <h1 className='text-4xl font-bold mb-4'>Event Created Successfully!</h1>
      {latestEvent ? (
        <div className='text-lg text-center'>
          <p>
            Your event
            <span className='font-bold'> {latestEvent.title} </span>
            has been successfully created and is now live.
          </p>
          <p className='mt-4 text-base'>
            <span className='font-semibold'>Event Date: </span>
            {latestEvent.date}
          </p>
        </div>
      ) : (
        <p className='text-lg'>Thank you for creating the event.</p>
      )}
      <div className='mt-6'>
        <Link
          href={`/dashboard`}
          className='px-6 py-3 bg-red-600 font-semibold text-white rounded-lg hover:bg-red-700 transition'
        >
          View My Events
        </Link>
      </div>
    </div>
  )
}

export default Success;
