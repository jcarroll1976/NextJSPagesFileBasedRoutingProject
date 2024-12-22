import Head from "next/head";

import EventsList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function HomePage(props) {
    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <NewsletterRegistration />
            <EventsList items={props.events} />
        </div>
        
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    }
}