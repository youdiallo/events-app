import { useRouter } from 'next/router';
import { Fragment } from 'react';

import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {

    const router = useRouter();

    const filteredData = router.query.slug;

    if( !filteredData ) {
        return <ErrorAlert>
            <p className='center'>Loading...</p>
        </ErrorAlert>
    }

    const numYear = props.date.year;
    const numMonth = props.date.month;

    if( props.hasError) {
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

    const filteredEvents = props.events;

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

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredData = params.slug;

  const numYear = +(filteredData[0]);
  const numMonth = +(filteredData[1]);

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {hasError: true}
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      },
    }
  }

}