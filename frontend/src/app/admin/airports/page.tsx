"use client"

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Funnel, Info, Plus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import { Airport } from "@/types/airport";
import { AirportService } from "@/service/airportService";

export default function AirportTable() {
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [search, setSearch] = useState("");
    const [toUpdate, setUpdate] = useState<Airport>();
    const [toDelete, setDelete] = useState<Airport>();

    const [airports, setAirports] = useState<Airport[]>([]);
    const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await AirportService.getAllAirports();
                setAirports(data);
            } catch (error) { toast.error(`${error}`) } 
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [reload]);

    useEffect(() => {
        const searchInput = search.trim().toUpperCase();
        if (searchInput !== "") {
            setFilteredAirports(
                airports.filter((item) => 
                    item.name?.includes(searchInput)
                )
            );
        } else setFilteredAirports(airports);
    }, [search, airports]);

    if (loading) {return <Loader />}
    return(
        <section className="w-full flex flex-col">
            <Toaster closeButton position="top-center" />
            <div className="flex items-center gap-2">
                <Image
                    src="/images/emirates.svg"
                    alt="Emirates Logo"
                    width={40}
                    height={40}
                />
                <div className="text-2xl text-darkred font-emirates-bold">All Airports</div>
            </div>

            <div className="flex items-center mt-2">
                <input 
                    type="text"
                    className="w-100 pl-3 py-1 rounded-md bg-light border-1 border-slate-300 shadow-xs"
                    placeholder="Search for a airport"
                    value={ search }
                    onChange={ e => setSearch(e.target.value) }
                />
                <div className="ms-auto flex gap-2">
                    <div className="flex items-center gap-1 ms-auto">
                        <div className="text-gray">Showing</div>
                        <Select>
                            <SelectTrigger className="bg-light">
                                <SelectValue placeholder="10" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Value1">Value 1</SelectItem>
                                <SelectItem value="Value2">Value 2</SelectItem>
                                <SelectItem value="Value3">Value 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button 
                        variant="secondary" 
                        className="bg-light shadow-xs font-emirates-bold"
                    >
                        <Funnel className="text-4 h-4" />Filter
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="bg-light shadow-xs font-emirates-bold"
                    >
                        <Download className="text-4 h-4" />Export
                    </Button>
                    <Link 
                        className="!bg-darkred rounded-md inline-flex items-center justify-center gap-2 text-light px-4 py-1 hover:opacity-90"
                        href="/admin/airports/add-airport"
                    >
                        <Plus className="text-4 h-4" />Add a airport
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-4 bg-gold text-light font-emirates-bold rounded-sm text-sm py-1.5 mt-2">
                <div className="pl-2 col-span-2">Airport Name</div>
                <div className="pl-2">Country</div>
                <div className="pl-2">Action</div>
            </div>
            <div className="grid grid-cols-4 bg-light gap-2 font-emirates-bold rounded-sm text-sm">
            {airports.length > 0 ?
                filteredAirports.length > 0 ?
                    filteredAirports.map((item, index) => (
                     
                            <Fragment key={ index }>
                                <div className="h-20 flex items-center gap-2 pl-2 border-b-1 border-r-1 border-slate-300 py-1.5 col-span-2 truncate">
                                    <Image
                                        src={ item.logo_url }
                                        alt={ item.name! }
                                        width={200}
                                        height={200}
                                    />
                                    <div className="mx-auto">{ item.name }</div>
                                </div>
                                <div className="flex items-center pl-2 border-b-1 border-r-1 border-slate-300 py-1.5 uppercase">{ item.country?.name }</div>
                                <div className="flex items-center gap-4 pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">
                                    <button onClick={ () => setUpdate(item) }><SquarePen className="w-4 h-4 text-darkgreen" /></button>
                                    <button><Info className="w-4 h-4 text-yellow-700" /></button>
                                    {/* <button
                                        onClick={ () => setDelete({
                                            id: item.id,
                                            name: item.name
                                        })}
                                    >
                                        <Trash2 className="w-4 h-4 text-darkred" />
                                    </button> */}
                                </div>
                            </Fragment>
                      
                    )) : (<div className="text-gray">Filter shows 0 result.</div>)
            : (<div>There are no existing airports yet.</div>)}
            </div>


        </section>
    )
}