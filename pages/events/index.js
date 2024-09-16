import EventsList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data"

export default function EventsPage() {
    const events = getAllEvents();
    return (
        <div>
             <EventsList items={events} />
        </div>
       
    )
}