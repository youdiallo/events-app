import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';

function AllEventsPage(props) {
    const router = useRouter();
    const { events } = props;

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler}/>
            <EventList items={events}/>
        </Fragment>
    )
}

export default AllEventsPage;

export async function getStaticProps() {
    const events = await getAllEvents();
    return {
        props:{
            events:events,
        },
        revalidate: 60
    };
}