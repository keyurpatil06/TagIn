import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import { getEventsList } from '@/lib/actions/event.actions'
// import { getLoggedInUser } from '@/lib/actions/user.actions';
// import { redirect } from 'next/navigation';

const EventsPage = async () => {
  const events = await getEventsList();
  // const loggedIn = await getLoggedInUser();

  // if (!loggedIn) redirect('/sign-in')

  return (
    <div className='pt-16 min-h-screen'>
      <Navbar />
      <div className="flex-center flex-col p-6 bg-slate-950">
        <h1 className="text-4xl font-bold text-white max-md:mt-8 mt-4 mb-8 text-center">Ongoing Events</h1>
        <div className="flex gap-10 flex-wrap justify-center md:max-w-7xl">
          {events.map(({ $id, title, date, city, description, bannerImageUrl }: EventDetailsProps) => (
            <EventCard
              key={$id}
              $id={$id}
              title={title}
              date={date}
              city={city}
              description={description}
              bannerImageUrl={bannerImageUrl}
              showBtn={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventsPage;
