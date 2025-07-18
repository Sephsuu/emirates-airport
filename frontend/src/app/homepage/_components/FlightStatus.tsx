import { flightStatus } from "@/lib/data-array";
import { displayCurrentDateTime, formatFlightDate } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";
import Marquee from 'react-fast-marquee';

export function FlightStatusSection() {
    const [dateTime, setDateTime] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(displayCurrentDateTime());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                {flightStatus.map((item, index) => (
                    <Fragment key={ index }>
                        <div className="text-lg py-2 uppercase font-emirates-bold px-2 border-y-1 border-y-slate-400">
                            { item.flightNo }
                        </div> 
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ item.departure }</span></Marquee>
                        </div>   
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ item.arrival }</span></Marquee>
                        </div>    
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ formatFlightDate(item.departureTime) }</span></Marquee>
                        </div>   
                        <div className="text-lg py-2 overflow-hidden uppercase font-emirates-bold pl-2 pr-6 border-y-1 border-y-slate-400">
                            <Marquee speed={30}><span className="mr-24">{ formatFlightDate(item.arrivalTime) }</span></Marquee>
                        </div>
                        <div className="text-lg py-2 uppercase font-emirates-bold px-2 border-y-1 border-y-slate-400">
                            { item.flightStatus }
                        </div> 
                    </Fragment>
                ))}
            </div>
            
        </section>
    );
}