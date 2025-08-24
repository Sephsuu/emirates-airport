"use client"

import { displayCurrentDateTime, formatTimezone } from "@/lib/utils";
import { Flight } from "@/types/flight";
import { Fragment, useEffect, useState } from "react";
import Marquee from 'react-fast-marquee';
import Loader from "@/components/ui/loader";
import { getSocket } from "@/lib/socket";

export function FlightStatusSection() {
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [dateTime, setDateTime] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(displayCurrentDateTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const socket = getSocket();
        socket.on('flights', (data: Flight[]) => {
            setFlights(data);
            setLoading(false);
        })
        return () => {
            socket.off('flights');
        }
    }, []);
    console.log(flights);
    

    if (loading) return <section className="w-full py-20 bg-slate-200"><Loader /></section>
    return(
        <section className="bg-dark p-8">
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-5xl text-light font-emirates-bold">Flight Status</div>
                    <div className="text-md text-slate-400">Track flights online, view detailed flight information, and monitor destinations.</div>
                </div>
                <div className="bg-darkred text-light px-4 py-2 rounded-md h-fit">{ dateTime }</div>
            </div>
            
            <div className="grid grid-cols-6 text-light mt-4">
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">FLIGHT NO.</div>
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">DESTINATION</div>
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">ARRIVAL</div>
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">DEPARTURE TIME</div>
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">ARRIVAL TIME</div>
                <div className="text-md font-emirates-bold pl-2 py-2 text-slate-400 border-y-1 border-y-slate-400">STATUS</div>
                {flights.map((item, index) => (
                    <Fragment key={ index }>
                        <div className="text-lg py-2 uppercase font-emirates-bold px-2 border-y-1 border-y-slate-400">
                            { item.flight_no }
                        </div> 
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ `${item.departure_city}, ${item.departure_country}` }</span></Marquee>
                        </div>   
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ `${item.arrival_city}, ${item.arrival_country}` }</span></Marquee>
                        </div>    
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ formatTimezone(item.departure_time!) }</span></Marquee>
                        </div>   
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ formatTimezone(item.arrival_time!) }</span></Marquee>
                        </div>
                        <div className="text-lg py-2 uppercase font-emirates-bold px-2 border-y-1 border-y-slate-400">
                            { "Status" }
                        </div> 
                    </Fragment>
                ))}
            </div>
            
        </section>
    );
}