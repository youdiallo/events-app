import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useSWR } from 'swr';

import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {

    const router = useRouter();

    const [events, setEvents] = useState();

    const { data, error } = useSWR(
      "https://nextjs-course-475b5-default-rtdb.firebaseio.com/events.json",
      (url) => fetch(url).then((res) => res.json())
    );

    if (!events) {
      return (
        <ErrorAlert>
          <p className="center">Loading...</p>
        </ErrorAlert>
      );
    }

    const filteredData = router.query.slug;
    console.log(typeof filteredData);
    console.log(+filteredData[0]);
    const numYear = +filteredData[0];
    const numMonth = +(filteredData[1]);

    if( 
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12 ||
      error
    ) {
        return (
          <Fragment>
            <ErrorAlert>
              <p>Invalid filter. Please adjust your values!</p>
            </ErrorAlert>
            <div className="center">
              <Button link="/events">Show All Events</Button>
            </div>
          </Fragment>
        );
    }

    useEffect(() => {
      if( data ) {
        const eventsArray = [];
        for (let key in data) {
          eventsArray.push({
            id: key,
            ...data[key],
          });
        }
        setEvents(eventsArray);
      }
    }, [data]);

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      );
    });

    if(!filteredEvents || filteredEvents.length === 0) {
        return (
          <Fragment>
            <ErrorAlert>
              <p className="center">No events found for the chosen filter!</p>
            </ErrorAlert>
            <div className="center">
              <Button link="/events">Show All Events</Button>
            </div>
          </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    )
}

export default FilteredEventsPage;

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filteredData = params.slug;

//   const numYear = +(filteredData[0]);
//   const numMonth = +(filteredData[1]);

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {hasError: true}
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       },
//     }
//   }

// }