"use client"

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Delete, Download, Funnel, Info, Map, Plus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import { Destination } from "@/types/destination";
import { DestinationService } from "@/service/destinationService";
import { Separator } from "@/components/ui/separator";
import { UpdateDestination } from "./_components/UpdateDestination";
import { DeleteDestination } from "./_components/DeleteDestination";

export default function DestinationTable() {
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [search, setSearch] = useState('');
    const [toUpdate, setUpdate] = useState<Destination | undefined>();
    const [toDelete, setDelete] = useState<Destination | undefined>();

    const [destinations, setDestinations] = useState<Destination[]>([])
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await DestinationService.getAllDestinations();
                setDestinations(data);
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
            setFilteredDestinations(
                destinations.filter((item) => 
                    item.name?.includes(searchInput)
                )
            );
        } else setFilteredDestinations(destinations);
    }, [search, destinations]);

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
                <div className="text-2xl text-darkred font-emirates-bold">All Destinations</div>
            </div>

            <div className="flex items-center mt-2">
                <input 
                    type="text"
                    className="w-100 pl-3 py-1 rounded-md bg-light border-1 border-slate-300 shadow-xs"
                    placeholder="Search for a destination"
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
                        href="/admin/countries/destinations/add-destination"
                    >
                        <Plus className="text-4 h-4" />Add a destination
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mt-2">
                {destinations.length > 0 ?
                    filteredDestinations.length > 0 ?
                        filteredDestinations.map((item, index) => (
                            <div className="rounded-md shadow-sm bg-light overflow-hidden" key={ index }>
                                <img
                                    src={ item.image_url }
                                    className="w-full h-35 object-cover rounded-t-md transform transition-transform duration-500 hover:scale-105"
                                />
                                <div className="flex flex-col items-center gap-1 mt-2 px-4">
                                    <Map className="text-gold" />
                                    <div className="text-lg font-semibold text-darkred">{ item.name }</div>
                                    <div className="text-sm font-semibold text-center">{ `${item.city?.name}, ${item.country?.name}` }</div>
                                </div>
                                <div className="flex justify-center gap-3 my-4">
                                    <button
                                        onClick={ () => setUpdate(item) }
                                    >
                                        <SquarePen className="w-4 h-4 text-darkgreen" />
                                    </button>
                                    <button><Info className="w-4 h-4" /></button>
                                    <button
                                        onClick={ () => setDelete(item) }
                                    >
                                        <Trash2 className="w-4 h-4 text-darkred" />
                                    </button>
                                </div>
                            </div>
                        )) : (<div>No results found.</div>)
                    : (<div>There is no existing destinations as of now.</div>)
                }
            </div>

            {toUpdate && (
                <UpdateDestination 
                    toUpdate={ toUpdate }
                    setUpdate={ setUpdate }
                    setReload={ setReload }
                />
            )}

            {toDelete && (
                <DeleteDestination 
                    toDelete={ toDelete }
                    setDelete={ setDelete }
                    setReload={ setReload }
                />
            )}
        </section>
    );
}