"use client"

import { Homepage } from "@/app/homepage/page"
import { Button, buttonVariants } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CountryService } from "@/service/countryService";
import { Country } from "@/types/country";
import { error } from "console";
import { Download, Funnel, Plus } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react"
import { toast } from "sonner";

export default function CountryTable() {
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await CountryService.getAllCountries();
                setCountries(data);
            } catch (error) { toast.error(`${error}`) } 
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {return <Loader />}
    return(
        <section className="w-full flex flex-col gap-2">
            <div className="text-2xl text-left font-emirates-bold">All Countries</div>

            <div className="flex items-center">
                <input 
                    type="text"
                    className="w-100 pl-3 py-1 rounded-md bg-light border-1 border-slate-300 shadow-xs"
                    placeholder="Search for a country"
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
                        href="/admin/countries/add"
                    >
                        <Plus className="text-4 h-4" />Add a country
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-3 bg-gold text-light font-emirates-bold rounded-sm text-sm py-1.5">
                <div className="pl-2">Alpha Code</div>
                <div className="pl-2">Country Name</div>
                <div className="pl-2">Continent</div>
            </div>
            <div className="grid grid-cols-3 bg-light gap-2 font-emirates-bold rounded-sm text-sm">
            {countries.length > 0 ?
                countries.map((item, index) => (
                    <Fragment key={ index }>
                        <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">{ item.code }</div>
                        <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5 uppercase">{ item.name }</div>
                        <div className="pl-2 border-b-1 border-r-1 border-slate-300 py-1.5">{ item.continent }</div>
                    </Fragment>
                )): (<div className="text-gray font-emirates-bold">There are no existing country as of now.</div>)}
            </div>
        </section>
    )
}