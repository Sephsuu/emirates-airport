"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bookFlighTabs, heroContinents, tripsDestination } from "@/lib/data-array";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FlightStatus, ManageBoookingTab, SearchFlightTab } from "./_components/bookFlight";
import { Card } from "@/components/ui/card";

function Hero() {
    return(
        <section 
            className="h-screen"
            style={{ 
                backgroundImage: 'url("/images/dubai.png")',
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="flex flex-col gap-2 h-full justify-center items-center">

                <div className="z-20 flex flex-col items-center">
                    <div className="text-6xl font-emirates-bold text-light">Don't Just Fly,</div>
                    <div className="text-light font-emirates-bold text-8xl italic">FLY BETTER</div>
                </div>

                <div className="relative flex flex-col justify-center rounded-full p-[2px] bg-[linear-gradient(90deg,_hsla(312,93%,84%,1)_0%,_hsla(220,61%,79%,1)_100%)] w-120 z-20">
                    <Input
                        className="rounded-full bg-light placeholder:text-gray-400 pl-4" 
                        placeholder="Search for flights"
                    />

                    <div className="absolute right-2 flex justify-center items-center">
                        <Select>
                            <SelectTrigger className="!border-0 !bg-transparent text-sm !gap-1 font-semibold px-1">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USA">USA</SelectItem>
                            </SelectContent>
                        </Select>

                        <button><Search className="text-light rounded-full w-6 h-6 bg-darkred p-1.5 hover:bg-light hover:text-darkred hover:border-1 hover:border-darkred" /></button>
                    </div>
                </div>

                <div className="flex z-30 gap-6">
                    {
                        heroContinents.map((continent, index) => (
                            <Link 
                                href={ continent.link } 
                                key={ index }
                                className="text-sm text-light font-emirates-bold underline hover:text-darkred"
                            >
                                { continent.continent }
                            </Link>
                        ))
                    }
                </div>

                <Image
                    src={"/images/hero.png"}
                    alt=""
                    width={500}
                    height={500}
                    className="hero w-200 mt-[-100px] z-10 bottom-0"
                />

            </div>
        </section>
    );
}

function BookFlight() {
    const [activeTab, setActiveTab] = useState<string>("Search Flight")

    return(
        <section className="bg-light py-8 h-fit">

            <div className="text-darkred text-5xl text-center">Book a flight</div>

            <div className="w-[70%] flex flex-col items-center mx-auto mt-4">

                <div className="flex rounded-t-lg bg-lightbrown shadow-sm w-fit z-20 overflow-hidden">
                    {
                        bookFlighTabs.map((tab, index) => (
                            <button 
                                onClick={ () => setActiveTab(tab.title) }
                                className={`px-4 py-0.5 ${activeTab === tab.title && "bg-darkred text-light"}`}
                                key={ index }
                            >
                                { tab.title }
                            </button>
                        ))
                    }
                </div>

                <div className="bg-lightbrown w-full shadow-sm gap-2 p-4 rounded-sm">
                    { activeTab === "Search Flight" && ( <SearchFlightTab /> )}
                    { activeTab === "Manage Booking" && ( <ManageBoookingTab /> )}
                    { activeTab === "Flight Status" && ( <FlightStatus /> )}
                </div>

            </div>
        </section>
    );
}

function TripsActivites() {
    return(
        <section className="py-8 w-full">

            <div className="flex justify-center items-center mx-auto">
                <div className="text-xl font-emirates-bold z-10">Featured destinations from</div> 
                <Select>
                    <SelectTrigger className="border-0 bg-white shadow-none text-xl font-emirates-bold text-darkred ml-[-5px] *:data-[slot=select-value]:text-darkred">
                        <SelectValue placeholder="Manila"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="destination">Destination</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* {
                tripsDestination.map((trip, index) => (
                    <div className="rounded-sm bg-light-100 shadow-sm overflow-hidden">
                        <div className="w-full"><img className="object-cover h-40 w-full bg-center" src={"/images/dubai.png"} alt="" /></div>
                        <div className="text-center font-emirates-bold text-lg my-1">{ trip.place }</div>
                        <div className="text-md text-gray-500 text-center">{ trip.country }</div>
                        <div className="text-gray-800 text-sm text-justify truncate h-full px-4 mt-2 h-30">{ trip.description }</div>
                    </div>
                ))
            } */}
        
        </section>
    );
}

export function Homepage() {
    return(
        <section>
            <Hero/>
            <BookFlight />
            <TripsActivites />
        </section>
    );
}