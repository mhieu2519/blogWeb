import "./event.css";
import EventClient from "./EventClient";

export const dynamic = "force-dynamic";

export default function EventPage({ searchParams }) {
    const dateStr = searchParams?.t;
    const displayName = searchParams?.n;

    let formattedDate = "";
    let name = "";

    if (dateStr?.length === 8) {
        formattedDate = dateStr.replace(/(\d{2})(\d{2})(\d{4})/, '$1-$2-$3');
    }

    if (displayName) {
        name = decodeURIComponent(displayName);
    }

    return <EventClient date={formattedDate} name={name} />;
}
