import { useRouter} from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventsList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

export default function FilteredEventsPage() {
    const router = useRouter();

    const filteredData = router.query.slug;

    if(!filteredData) {
        return <p className="center">Loading...</p>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(isNaN(numYear) ||
       isNaN(numMonth) ||
       numYear > 2030 ||
       numYear < 2021 ||
       numMonth < 1 ||
       numMonth > 12 ) 
       {
        return (
            <>
            <p>Invalid path! Please try again!</p>
            <div className="center">
                <Button href="/events">Show All Events</Button>
            </div>
            </>
        )
        
       }
       
       const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
       });

       if(!filteredEvents || filteredEvents.length === 0) {
            return (
                <>
                <p>No events found!</p>
                <div className="center">
                    <Button href="/events">Show All Events</Button>
                </div>
                </>
            )
       }

       const date = new Date(numYear,numMonth -1);

    return (
        <div>
            <ResultsTitle date={date}/>
            <EventsList items={filteredEvents}/>
        </div>
    )
}