import EventCard from '@/components/EventCard';
import { getEventsCreatedByUser, getEventsUsersRegisteredFor } from '@/lib/actions/event.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const Dashboard = async () => {
  const user = await getLoggedInUser();
  const userId = user.$id;
  const userCreatedEvents = await getEventsCreatedByUser(userId);
  const userRegisteredEvents = await getEventsUsersRegisteredFor(userId);

  // console.log(userCreatedEvents);

  return (
    <div className="min-h-screen p-6 bg-gray-100 pt-24">
      <h1 className="text-2xl font-bold text-center mb-8">User Dashboard</h1>

      {/* Created Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Created Events</h2>
        {userCreatedEvents.length > 0 ? (
          <ul className="space-y-4">
            {userCreatedEvents.map(({ title, date, city, description, ...event }: any) => (
              <li key={event.$id}>
                <EventCard
                  $id={event.$id}
                  title={title}
                  description={description}
                  date={date}
                  city={city}
                  bannerImageUrl={event.bannerImageUrl}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </section>

      {/* Registered Events */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Events You Registered For</h2>
        {userRegisteredEvents.length > 0 ? (
          <ul className="space-y-4">
            {userRegisteredEvents.map(({ title, date, city, description, ...event }: any) => (
              <li key={event.$id}>
                <EventCard
                  $id={event.$id}
                  title={title}
                  description={description}
                  date={date}
                  city={city}
                  bannerImageUrl={event.bannerImageUrl}
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
