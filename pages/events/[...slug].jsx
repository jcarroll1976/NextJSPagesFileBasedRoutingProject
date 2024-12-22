import { useRouter} from "next/router";
import useSWR from "swr";

import { getFilteredEvents } from "../../helpers/api-util";
import EventsList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { useEffect, useState } from "react";

export default function FilteredEventsPage(props) {
    const [loadedEvents, setLoadedEvents] = useState([]);
    const router = useRouter();

    const filteredData = router.query.slug;
    const {data, error} = useSWR("https://nextjs-course-5f258-default-rtdb.firebaseio.com/events.json", (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if(data) {
            const events = [];

            for(const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }
            setLoadedEvents(events);
        }
    }, [data])

    let pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content="A list of filtered events" />
        </Head>
    );


    if(!loadedEvents) {
        return <>
                {pageHeadData}
                <p className="center">Loading...</p>
              </>
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

     pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events for ${numMonth}/${numYear}`} />
        </Head>
    )

   

    if(isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
    ) 
       {
        return (
            <>
            {pageHeadData}
            <ErrorAlert>
                <p>Invalid path! Please try again!</p>
            </ErrorAlert>
            <div className="center">
                <Button link="/events">Show All Events</Button>
            </div>
            </>
        )
        
       }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
      });

    
       
       

       if(!filteredEvents || filteredEvents.length === 0) {
            return (
                <>
                {pageHeadData}
                <ErrorAlert>
                    <p>No events found!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
                </>
            )
       }

       const date = new Date(numYear,numMonth -1);

    return (
        <div>
            {pageHeadData}
            <ResultsTitle date={date}/>
            <EventsList items={filteredEvents}/>
        </div>
    )
}

/*export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

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
        return {
            props: { hasError: true }
            //notFound: true,
            //redirect: {
            //    destination: '/error'
            //}
        }
        
       }
       
       const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
       });

       if(!filteredEvents || filteredEvents.length === 0) {
            return {
                props: { hasError: true }
            }
       }

       const date = new Date(numYear,numMonth -1);

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        }
    }
}*/