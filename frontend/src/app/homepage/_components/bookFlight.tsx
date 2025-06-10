import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDownIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SearchFlightTab() {
    return(
        <section className="flex gap-2">
            <div className="w-full bg-light rounded-sm py-1">
                <div className="absolute text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Departure Airport</div>
                <div className="flex mt-6 px-3">
                    <MapPin className="text-dark w-5 h-5 mt-1.5" strokeWidth={2} />
                    <Select>
                        <SelectTrigger className="flex w-full text-2xl font-sans uppercase border-0 ml-[-5px]">
                            <SelectValue placeholder="Select Departure" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="destination">Destination</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            <div className="w-full bg-light rounded-sm py-1">
                <div className="absolute text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Arrival Airport</div>
                <div className="flex mt-6 px-3">
                    <MapPin className="text-dark w-5 h-5 mt-1.5" strokeWidth={2} />
                    <Select>
                        <SelectTrigger className="flex w-full text-2xl font-sans uppercase border-0 ml-[-5px]">
                            <SelectValue placeholder="Select Arrival" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="destination">Destination</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex items-center">
                <button className="px-4 py-1.5 text-light bg-darkred rounded-sm">Continue</button>
            </div>
        </section>
    );
}

export function ManageBoookingTab() {
    return(
        <section>
            <div className="w-full flex gap-2">

                <div className="w-full bg-light rounded-sm py-1">
                    <div className="text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Last Name</div>
                    <Input 
                        className="font-sans uppercase !text-2xl bg-light !py-4 border-0 placeholder:font-emirates-medium placeholder:capitalize placeholder:text-lg" 
                    />
                </div>

                <div className="w-full bg-light rounded-sm py-1">
                    <div className="text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Booking Reference</div>
                    <Input 
                        className="font-sans uppercase !text-2xl bg-light !py-4 border-0 placeholder:font-emirates-medium placeholder:capitalize placeholder:text-lg" 
                    />
                </div>

            </div>

            <div className="flex justify-center mt-4 gap-2">
                <button className="px-4 py-1.5 text-light bg-darkred rounded-sm w-40">Manage Booking</button>
                <button className="px-4 py-1.5 text-light bg-darkred rounded-sm w-40">Check In</button>
            </div>

            <div className="flex justify-center mt-4">
                <Link href={"#"} className="underline text-sm text-center mx-auto">Login to view your trips</Link>
            </div>

        </section>
    );
}

export function FlightStatus() {
    const [activeClass, setActiveClass] = useState<string>("Routes");
    const [activeDay, setActiveDay] = useState<string>("Departure Day");
    const [open, setOpen] = useState<boolean>(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    return(
        <section>

            <div className="w-full flex">
                <div className="w-full flex rounded-pill justify-center gap-2">
                    <button onClick={ () => setActiveClass("Routes") } className={`text-xs py-0.5 w-22 text-center rounded-full ${activeClass === "Routes" ? "bg-darkred text-light" : "bg-light text-darkred"}`}>Routes</button>
                    <button onClick={ () => setActiveClass("Flight Number") } className={`text-xs py-0.5 w-22 text-center rounded-full ${activeClass === "Flight Number" ? "bg-darkred text-light" : "bg-light text-darkred"}`}>Flight Number</button>
                </div>
                <div className="w-full flex rounded-pill justify-center gap-2">
                    <button onClick={ () => setActiveDay("Departure Day") } className={`text-xs py-0.5 w-22 text-center rounded-full ${activeDay === "Departure Day" ? "bg-darkred text-light" : "bg-light text-darkred"}`}>Departure Day</button>
                    <button onClick={ () => setActiveDay("Arrival Day") } className={`text-xs py-0.5 w-22 text-center rounded-full ${activeDay === "Arrival Day" ? "bg-darkred text-light" : "bg-light text-darkred"}`}>Arrival Day</button>
                </div>
            </div>

            <div className={`grid gap-2 mt-2 w-full ${activeClass === "Routes" ? "grid-cols-[1fr_1fr_1fr_auto]" : "grid-cols-[1fr_1fr_auto]"}`}>
                {
                    activeClass === "Routes" && (<>
                        <div className="w-full bg-light rounded-sm py-1">
                            <div className="absolute text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Departure Airport</div>
                            <div className="flex mt-6 px-3">
                                <Select>
                                    <SelectTrigger className="flex w-full text-2xl font-sans uppercase border-0" chevronColor="text-dark" chevronStrokeWidth={4}>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="destination">Destination</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full bg-light rounded-sm py-1">
                            <div className="absolute text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Arrival Airport</div>
                            <div className="flex mt-6 px-3">
                                <Select>
                                    <SelectTrigger className="flex w-full text-2xl font-sans uppercase border-0" chevronColor="text-dark" chevronStrokeWidth={4}>
                                        <SelectValue placeholder="" className="placeholder:text-dark" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="destination">Destination</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="w-full bg-light rounded-sm py-1">
                            <div className="text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Departure Airport</div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className={`w-full justify-between font-normal font-sans text-2xl uppercase bg-light border-0 ${!date && "text-gray-400"}`}
                                >
                                    {date ? date.toLocaleDateString() : "MM/DD/YYYY"}
                                    <ChevronDownIcon />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <button className="px-4 py-1.5 text-light bg-darkred rounded-sm">Check Status</button>
                        </div>
                    </>)
                }{
                    activeClass === "Flight Number" && (<>

                        <div className="w-full bg-light rounded-sm py-1">
                            <div className="text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Flight Number</div>
                            <Input 
                                className="font-sans uppercase !text-2xl bg-light !py-4 border-0 placeholder:font-emirates-medium placeholder:capitalize placeholder:text-lg" 
                            />
                        </div>

                        <div className="w-full bg-light rounded-sm py-1">
                            <div className="text-sm font-emirates-medium capitalize ml-3.5 mt-1 text-gray-400">Departure Airport</div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className={`w-full justify-between font-normal font-sans text-2xl uppercase bg-light border-0 ${!date && "text-gray-400"}`}
                                >
                                    {date ? date.toLocaleDateString() : "MM/DD/YYYY"}
                                    <ChevronDownIcon />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                    }}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <button className="px-4 py-1.5 text-light bg-darkred rounded-sm">Check Status</button>
                        </div>
                    </>)
                }
            </div>


        </section>
    );
}