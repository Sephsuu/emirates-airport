"use client";

import { HeroSection } from "./_components/Hero";
import { BookFlightSection } from "./_components/BookFlightS";
import { TripsActivitesSection } from "./_components/TripsActivities";
import { FlightStatusSection } from "./_components/FlightStatus";

export function Homepage() {
    return(
        <section>
            <HeroSection/>
            <BookFlightSection />
            <FlightStatusSection />
            <TripsActivitesSection />
        </section>
    );
}