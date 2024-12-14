import EventDetails from '@/components/EventDetails'
import Navbar from '@/components/Navbar'
import { getEvent } from '@/lib/actions/event.actions'
import React from 'react'

type Props = {
  params: { id: string };
};

const IndividualEvent = async ({ params }: Props) => {
  const { id } = params;
  const event = await getEvent(id);
  const userId = 'userid'; // TO BE DONE

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className=' bg-slate-950 text-white'>
      <Navbar />
      <div className='md:pt-16 min-h-screen pt-28 px-6 flex items-center justify-center'>
        <EventDetails event={event} userId={userId}/>
      </div>
    </div>
  );
};

export default IndividualEvent;
