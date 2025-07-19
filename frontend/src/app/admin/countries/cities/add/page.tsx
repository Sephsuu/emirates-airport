"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { handleChange } from "@/lib/form-handler";
import { CityService } from "@/service/cityService";
import { CountryService } from "@/service/countryService";
import { City } from "@/types/city";
import { Country } from "@/types/country";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const cityInit = {
    name: "",
    country_id: ""
}

export default function CreateCity() {
    const [city, setCity] = useState(cityInit);
    const [onProcess, setProcess] = useState(false);
    const [countries, setCountries] = useState<City[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await CountryService.getAllCountries();
                setCountries(data);
            } catch (error) { toast.success(`${error}`) }
        }
        fetchData();
    }, [])

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await CityService.createCity(city);
            if (data) toast.success(`${data.name} added to cities.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setCity(cityInit);
        }
    }

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

                <div className="text-2xl font-emirates-bold text-center">Add a City</div>

                <div>
                    <div className="text-md text-gray">City Name</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="name"
                        value={ city.name }
                        onChange={ e => handleChange(e, setCity) }
                    />
                </div>

                <div>
                    <Select
                        name="continent" 
                        value={ city.country_id }
                        onValueChange={ value => setCity(prev => ({
                            ...prev,
                            country_id: value
                        })) } 
                    >
                        <div className="text-md text-gray">Alpha Code</div>
                        <SelectTrigger className="w-full border-slate-400 border-1">
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
    
                <Button
                    className="!bg-gold text-light text-md hover:opacity-90 w-full mt-2"
                    onClick={ handleSubmit }
                    disabled={ onProcess }
                >
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Adding City</>) : "Add City"}
                </Button>
            </div>
        </section>
    )
}