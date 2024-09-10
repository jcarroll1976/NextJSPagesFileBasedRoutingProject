import EventItem from "./event-item";

export default function EventsList(props) {
    const {items} = props;

    return (
        <div>
            <ul>
                {items.map((event) => (<li><EventItem /></li>))}
            </ul>
        </div>
    )
}