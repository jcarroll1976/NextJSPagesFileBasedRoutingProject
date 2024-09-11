import EventsList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

export default function HomePage() {
    const featuredEvents = getFeaturedEvents();
    return (
        <div>
            <EventsList items={featuredEvents} />
        </div>
        
    )
}