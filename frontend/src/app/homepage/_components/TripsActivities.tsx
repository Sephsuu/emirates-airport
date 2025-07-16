import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { tripsImages, tripsDestination } from "@/lib/data-array";
import { MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";

const rotate = ["rotate-10", "-rotate-5", "rotate-5", "-rotate-15", "rotate-10", "-rotate-15", "rotate-10", "-rotate-5", "rotate-10", -"rotate-15"];
const colsClass: Record<string, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
};

export function TripsActivitesSection() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % tripsImages.length);
        }, 10000); 

        return () => clearInterval(interval);
    }, []);

    return(
        <section className="relative py-8 w-full h-screen">
            <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${tripsImages[index]})`, opacity: "0.1" }}>
            </div>
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
            <div className="relative text-center my-2">
                <div className="text-5xl font-emirates-bold"><span className="text-darkred">Find Your Best</span> Destination</div>
            </div>
            <div className="relative bg-darkred w-100 mx-auto rounded-md shadow-sm">
                <input 
                    type="text" 
                    className="w-full py-1.5 px-8 text-light placeholder:text-light"
                    placeholder="Search Destination"
                />
                <MapPin className="absolute left-1 top-1/7 w-6 h-6 text-darkred" fill="#faf9f6" />
                <Search className="absolute right-2 top-1/4 w-4 h-4 text-light" strokeWidth={4} />
            </div>
            <div className={`grid mt-8 ${tripsDestination.length < 6 ? colsClass[tripsDestination.length.toString()] : "grid-cols-5"}`}>
                {tripsDestination.map((item, index) => (
                    <Tooltip key={ index }>
                        <TooltipTrigger className="mx-auto">
                            <img
                                src={ item.link }
                                className={`w-70 h-70 object-cover border-3 rounded-xl ${rotate[index]} transform transition-transform duration-500 hover:scale-105`}
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-light" fillArrow="light">
                            <div className="text-lg text-darkred font-emirates-bold"><span className="text-gray-500">{ item.city },</span> { item.country }</div>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
            
        </section>
    );
}