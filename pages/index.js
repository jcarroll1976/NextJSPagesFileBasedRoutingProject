import { getFeaturedEvents } from "../dummy-data";

export default function HomePage() {
    const featuredEvents = getFeaturedEvents();
    return (
        <div>
            <h1>This is the Home Page</h1>
        </div>
        
    )
}