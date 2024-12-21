import EventCard from '@/components/EventCard';
import { getEventsCreatedByUser, getEventsUsersRegisteredFor } from '@/lib/actions/event.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Dashboard = async () => {
  const user = await getLoggedInUser();
  const userId = user.$id;
  const userCreatedEvents = await getEventsCreatedByUser(userId);
  const userRegisteredEvents = await getEventsUsersRegisteredFor(userId);

  return (
    <div className="min-h-screen p-6 bg-slate-950 text-white pt-28">
      <h1 className="text-4xl font-bold text-center mb-8">User Dashboard</h1>

      {/* Created Events */}
      <section className="mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-8 bg-slate-800 w-full p-3 text-gray-100 text-center rounded-xl">
          Your Created Events
        </h2>
        {userCreatedEvents.length > 0 ? (
          <ul className="flex gap-10 flex-wrap justify-center md:max-w-7xl">
            {userCreatedEvents.map(({ $id, title, date, city, description, bannerImageUrl }: EventDetailsProps) => (
              <li key={$id}>
                <EventCard
                  $id={$id}
                  title={title}
                  description={description}
                  date={date}
                  city={city}
                  bannerImageUrl={bannerImageUrl}
                  showBtn={false}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </section>

      {/* Registered Events */}
      <section className="mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-8 bg-slate-800 w-full p-3 text-gray-100 text-center rounded-xl">
          Events You Registered For
        </h2>
        {userRegisteredEvents.length > 0 ? (
          <ul className="flex gap-10 flex-wrap justify-center md:max-w-7xl">
            {userRegisteredEvents.map(({ $id, title, date, city, description, bannerImageUrl }: EventDetailsProps) => (
              <li key={$id}>
                <EventCard
                  $id={$id}
                  title={title}
                  description={description}
                  date={date}
                  city={city}
                  bannerImageUrl={bannerImageUrl}
                  showBtn={false}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't registered for any events yet.</p>
        )}
      </section>
    </div>
  )
}

export default Dashboard
