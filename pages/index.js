import EventList from "../components/events/EventList"
import { getFeaturedEvents } from "../helpers/api-utils"

export default function HomePage(props) {
  return (
    <div>
      <EventList items={props.events}/>
    </div>
  );
}

export async function getStaticProps(context) {
  const eventsArray = await getFeaturedEvents();

  return {
    props: {
      events: eventsArray,
    },
    revalidate: 1800
  }
}
