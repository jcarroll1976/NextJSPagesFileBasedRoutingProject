import Link from "next/link";

import styles from "./event-item.module.css";

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
            <li className={styles.item}>
                <img src={'/' + image} alt="" />
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <h2>{title}</h2>
                        <div className={styles.date}>
                            <time>{modifedDate}</time>
                        </div>
                        <div className={styles.address}>
                            <address>{formattedAddress}</address>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Link href={exploreLink}>Explore Event</Link>
                    </div>
                </div>
            </li>
        </div>
    )
}