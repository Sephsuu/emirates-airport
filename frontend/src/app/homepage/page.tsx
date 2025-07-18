"use client";

import { HeroSection } from "./_components/Hero";
import { BookFlightSection } from "./_components/BookFlightS";
import { TripsActivitesSection } from "./_components/TripsActivities";
import { FlightStatusSection } from "./_components/FlightStatus";
import { CollaborationsSection } from "./_components/Collaborations";
import { ExperiencePlanSection } from "./_components/ExperiencePlan";

export function Homepage() {
    return(
        <section>
            <HeroSection/>
            <BookFlightSection />
            <FlightStatusSection />
            <TripsActivitesSection />
            <CollaborationsSection />
            <ExperiencePlanSection />
        </section>
    );
}