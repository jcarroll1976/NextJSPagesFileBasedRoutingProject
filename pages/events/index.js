import EventsList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data"

export default function EventsPage() {
    const events = getAllEvents();
    return (
        <div>
            <EventsSearch />
            <EventsList items={events} />
        </div>
       
    )
}