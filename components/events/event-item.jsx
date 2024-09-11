import Link from "next/link";

export default function EventItem(props) {
    const {title, image, date, location, id} = props;

    const modifedDate = new Date(date).toLocaleDateString('en-US',
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }

    )

    const formattedAddress = location.replace(", ", "\n");

    const exploreLink = `/events/${id}`;

    return (
        <div>
            <li>
                <img src={'/' + image} alt="" />
                <div>
                    <div>
                        <h2>{title}</h2>
                        <div>
                            <time>{modifedDate}</time>
                        </div>
                        <div>
                            <address>{formattedAddress}</address>
                        </div>
                    </div>
                    <div>
                        <Link href={exploreLink}>Explore Event</Link>
                    </div>
                </div>
            </li>
        </div>
    )
}