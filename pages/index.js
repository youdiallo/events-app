import EventList from "../components/events/EventList"
import { getFeaturedEvents } from "../helpers/api-utils"
import NewsletterRegistration from '../components/input/newsletter-registration';

export default function HomePage(props) {
  return (
    <div>
      <NewsletterRegistration />
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
