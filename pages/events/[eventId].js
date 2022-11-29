import { Fragment } from 'react';

import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';


function EventDetailPage(props) {
    const event = props.event;

    if( !event ) {
        return <p>No event found!</p>
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent> 
        </Fragment>
    )
}
export default EventDetailPage;

export async function getStaticProps(context) {
    const { params } = context;
    const eventId = params.eventId;
    const foundEvent = await getEventById(eventId);
    if( !foundEvent ) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            event:foundEvent,
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const featuredEvents = await getFeaturedEvents();
    const eventsIds = featuredEvents.map((event) => (event.id));
    const eventsIdsWithParams = eventsIds.map((evId) => ({params: {eventId: evId}}));

    return {
        paths: eventsIdsWithParams,
        fallback: true
    }
}