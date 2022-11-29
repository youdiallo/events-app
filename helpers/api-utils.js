export async function getAllEvents() {
  const jsonData = await fetch(
    "https://nextjs-course-475b5-default-rtdb.firebaseio.com/events.json"
  );
  const data = await jsonData.json();
  const eventsArray = [];
  for (let key in data) {
    eventsArray.push({
      id: key,
      ...data[key]
    });
  }

  return eventsArray;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();
  return events.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const events = await getAllEvents();
  return events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const events = await getAllEvents();

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
