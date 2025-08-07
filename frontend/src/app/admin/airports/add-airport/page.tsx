"use client"

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { handleChange } from "@/lib/form-handler";
import { AirportService } from "@/service/airportService";
import { CountryService } from "@/service/countryService";
import { Country } from "@/types/country";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const airportInit = {
    name: "",
    country_id: "",
    logo_url: ""
}

export default function AddAirport() {
    const [loading, setLoading] = useState(true);
    const [airport, setAirport] = useState(airportInit);
    const [airportLogo, setAirportLogo] = useState<File | undefined>();
    const [onProcess, setProcess] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await CountryService.getAllCountries();
                setCountries(data);
            } catch (error) { toast.error(`${error}`) }
            finally { setLoading(false) }
        }
        fetchData();
    }, [])

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await AirportService.createAirport(airport, airportLogo);
            if (data) toast.success(`${airport.name.toUpperCase()} added to airports.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setAirport(airportInit);
            setAirportLogo(undefined);
        }
    }

    useEffect(() => {
        console.log(airport);
        
    }, [airport])

    if (loading) return <Loader />
    return(
        <section className="w-full flex justify-center items-center">
            <Toaster closeButton position="top-center" />
            <div className="flex flex-col gap-4 p-8 bg-white shadow-md w-100 pb-12 border-1 border-slate-300">
                <div className="w-full flex justify-center items-center gap-2 my-1">
                    <Image
                        src={ "/images/emirates_logo.png" }
                        alt=""
                        className="w-20"
                        width={ 90 }
                        height={ 90 }
                    />
                    <Image
                        src={ "/images/uae_logo.png" }
                        alt=""
                        className="w-7"
                        width={ 30 }
                        height={ 30 }
                    />
                </div>

                <div className="text-2xl font-emirates-bold text-center">Add an Airport</div>

                <div>
                    <div className="text-md text-gray">Airport Name</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="name"
                        value={ airport.name }
                        onChange={ e => handleChange(e, setAirport) }
                    />
                </div>
                <div>
                    <div className="text-md text-gray">Country</div>
                    <Select
                        value={ airport.country_id }
                        onValueChange={ (value) => setAirport(prev => ({
                            ...prev,
                            country_id: value
                        })) }
                    >
                        <SelectTrigger className="border-slate-400 border-1 w-full">
                            <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Countries</SelectLabel>
                                {countries.map((item, index) => (
                                    <SelectItem key={ index } value={ item.id! }>{ item.name }</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <div className="text-md text-gray">Airport Logo</div>
                    <input
                        type="file"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="logo"
                        accept="image/*,image/svg+xml"
                        onChange={e => {
                            if (e.target.files && e.target.files[0]) setAirportLogo(e.target.files[0]);
                        }}
                    />
                </div>
                <Button
                    className="!bg-gold text-light text-md hover:opacity-90 w-full mt-2"
                    onClick={ handleSubmit }
                    disabled={ onProcess }
                >
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Adding Airport</>) : "Add Airport"}
                </Button>
            </div>
        </section>
    )
}