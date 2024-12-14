'use client'

import Image from 'next/image'
import Button from './Button';
import { useRouter } from 'next/navigation';
import { registerForEvent } from '@/lib/actions/user.actions';

const EventDetails = ({ event, userId }: { event: EventDetails, userId: string }) => {
  const router = useRouter();

  const {
    $id,
    title,
    date,
    city,
    description,
    imgURL,
    organizedBy,
    location,
    time,
    price,
    tags,
    performers,
    attendeesCount,
  } = event;

  const handleRegister = async () => {
    try {
      const response = await registerForEvent(userId, $id);
      if (response.success) router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-fit md:flex gap-10 items-center justify-center bg-slate-800 shadow-lg rounded-2xl p-4 md:p-8'>
      <div className='flex justify-center w-full max-md:mt-6 p-2 md:p-4 rounded-xl items-center bg-slate-700'>
        <Image
          src={imgURL}
          alt={title}
          height={500}
          width={800}
          className='rounded-lg'
        />
      </div>

      <div className='mt-6 space-y-4 px-4 flex flex-col w-full'>
        <h1 className='text-3xl font-bold mb-4'>{title}</h1>
        <p className='text-lg text-gray-400 mb-4'>
          {date} • {time}
        </p>
        <p className='text-lg text-gray-300 mb-6'>{description}</p>

        <h2 className='text-xl font-semibold'>Event Details</h2>

        <div className='space-y-2'>
          <p className='text-gray-300'>
            <strong>Location:</strong> {location || city}
          </p>
          <p className='text-gray-300'>
            <strong>Organizer:</strong> {organizedBy}
          </p>
        </div>

        <p className='text-gray-300'>
          <strong>Price:</strong> {price !== 0 ? `$${price}` : `Free`}
        </p>

        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-2'>
            <span className='font-bold'>Tags:</span>
            {tags.map((tag, index) => (
              <span
                key={index}
                className='bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {performers && performers.length > 0 && (
          <div className='mt-4'>
            <span className='font-bold'>Performers:</span>
            <ul className='list-disc pl-6 text-gray-300'>
              {performers.map((performer, index) => (
                <li key={index}>{performer}</li>
              ))}
            </ul>
          </div>
        )}

        {attendeesCount && (
          <p className='text-gray-300'>
            <strong>Attendees:</strong> {attendeesCount} expected
          </p>
        )}

        <Button
          text='Register Now!'
          className='mt-6 py-2 bg-red-600 text-center font-semibold text-lg text-white rounded-lg hover:bg-red-700 transition duration-300'
          onClick={handleRegister}
        />
      </div>
    </div>
  )
}

export default EventDetails
