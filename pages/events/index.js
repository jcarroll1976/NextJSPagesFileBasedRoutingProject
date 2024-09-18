import { useRouter } from "next/router";

import EventsList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data"

export default function EventsPage() {
    const events = getAllEvents();
    const router = useRouter();

    function findEventsHandler(year,month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath);
    }
    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventsList items={events} />
        </div>
       
    )
}