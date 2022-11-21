import { useRouter } from 'next/router';

function EventDetailPage() {
    const router = useRouter();
    return (
        <div>
            <h1>The "{router.query.eventId}" event detail Page</h1>
        </div>
    )
}
export default EventDetailPage;