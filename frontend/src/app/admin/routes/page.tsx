"use client"

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { RouteService } from "@/service/routeService";
import { Route } from "@/types/route";
import { Download, Funnel, Info, Plus, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateRoute } from "./_components/CreateRoute";

export default function RoutesTable() {
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [toUpdate, setUpdate] = useState<Route>();
    const [toDelete, setDelete] = useState<Route>();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await RouteService.getAllRoutes();
                setRoutes(data);
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
            setFilteredRoutes(
                routes.filter((item) => 
                    item.departure_airport!.name.includes(searchInput) ||
                    item.departure_city!.name.includes(searchInput) ||
                    item.arrival_airport!.name.includes(searchInput) ||
                    item.arrival_city!.name.includes(searchInput) 
                )
            );
        } else setFilteredRoutes(routes);
    }, [search, routes]);

    if (loading) {return <Loader />}
    return(
        <section className="flex flex-col w-full">
            <Toaster closeButton position="top-center" />
            <div className="flex items-center gap-2">
                <Image
                    src="/images/emirates.svg"
                    alt="Emirates Logo"
                    width={40}
                    height={40}
                />
                <div className="text-2xl text-darkred font-emirates-bold">All Flight Routes</div>
            </div>

            <div className="flex items-center mt-2">
                <input 
                    type="text"
                    className="w-100 pl-3 py-1 rounded-md bg-light border-1 border-slate-300 shadow-xs"
                    placeholder="Search for a country"
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
                    <Button 
                        onClick={ () => setOpen(!open) }
                        className="!bg-darkred hover:opacity-90"
                    >
                        <Plus className="text-4 h-4" />Add a route
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-6 bg-gold text-light font-emirates-bold rounded-sm text-sm py-1.5 mt-2">
                <div className="pl-2">Departure Airport</div>
                <div className="pl-2">Departure City</div>
                <div className="pl-2">Arrival Airport</div>
                <div className="pl-2">Arrival City</div>
                <div className="pl-2">Type</div>
                <div className="pl-2">Actions</div>
            </div>

            <div className="grid grid-cols-6 bg-light gap-2 font-emirates-bold rounded-sm text-sm">
            {routes.length > 0 ?
                filteredRoutes.length > 0 ?
                    filteredRoutes.map((item, index) => (
                     
                            <Fragment key={ index }>
                                <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">
                                    <Image 
                                        src={ item.departure_airport!.logo_url }
                                        alt={ item.departure_airport!.name }
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">{ item.departure_city!.name }</div>
                                <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">
                                    <Image 
                                        src={ item.arrival_airport!.logo_url }
                                        alt={ item.arrival_airport!.name }
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">{ item.arrival_city!.name }</div>
                                <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">{ item.type }</div>
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
            : (<div>There are no existing routes yet.</div>)}
            </div>

            {open && (
                <CreateRoute
                    setOpen={ setOpen }
                    setReload={ setReload }
                />
            )}
        </section>
    );
}