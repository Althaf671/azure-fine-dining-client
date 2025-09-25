import Gallery from "./components/gallery";
import Hero from "./components/hero";
import Reservation from "./components/reservation";
import Testimonials from "./components/testimonials";
import Value from "./components/value";


export default function LandingPage() {
    return (
        <main>
            <Hero />
            <Value />
            <Gallery />
            <Testimonials />
            <Reservation />
        </main>
    )
}