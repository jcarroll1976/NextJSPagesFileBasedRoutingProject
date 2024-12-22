import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import Button from "../../components/ui/button";
import Head from "next/head";
import Comments from "../../components/input/comments";

export default function EventDetailPage(props) {
    const event = props.selectedEvent;

    if(!event) {
        return (
            <>
                <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description}/>
                </Head>
                <div className="center"><p>Loading...</p></div>;
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        )
    }

    return (
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.id;
    const event = await getEventById(eventId);

    if(!event) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            selectedEvent: event,
        },
        revalidate: 30,
    }

}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { id: event.id } }));

    return {
        paths: paths,
        fallback: true,
    }
}