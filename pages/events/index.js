import { useRouter } from "next/router";

import EventsList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";

export default function EventsPage(props) {
    const {events} = props;
    const router = useRouter();

    function findEventsHandler(year,month) {
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath);
    }
    return (
        <div>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventsList items={events} />
        </div>
       
    )
}

 export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props: {
            events: events,
        },
        revalidate: 60,
    }
 }
 

