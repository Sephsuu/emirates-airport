"use client"

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { handleChange } from "@/lib/form-handler";
import { CountryService } from "@/service/countryService";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const continents = ["ASIA", "AFRICA", "ANTARCTICA", "EUROPE", "NORTH AMERICA", "OCEANIA", "SOUTH AMERICA"];
const countryInit = {
    name: "",
    code: "",
    continent: ""
}

export default function CreateCountry() {
    const [country, setCountry] = useState(countryInit);
    const [onProcess, setProcess] = useState(false);

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await CountryService.createCountry(country);
            if (data) toast.success(`${data.name} added to countries.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setCountry(countryInit)
            setProcess(false);
            setCountry(countryInit);
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

                <div className="text-2xl font-emirates-bold text-center">Add a Country</div>

                <div>
                    <div className="text-md text-gray">Country Name</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="name"
                        value={ country.name }
                        onChange={ e => handleChange(e, setCountry) }
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="text-md text-gray">Alpha Code</div>
                        <input
                            type="text"
                            className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                            name="code"
                            value={ country.code }
                            onChange={ e => handleChange(e, setCountry) }
                        />
                    </div>
                    <div>
                        <Select
                            name="continent" 
                            value={ country.continent }
                            onValueChange={ value => setCountry(prev => ({
                                ...prev,
                                continent: value
                            })) } 
                        >
                            <div className="text-md text-gray">Alpha Code</div>
                            <SelectTrigger className="w-full border-slate-400 border-1">
                                <SelectValue placeholder="Continent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Continents</SelectLabel>
                                    {continents.map((item, index) => (
                                        <SelectItem key={ index } value={ item }>{ item }</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button
                    className="!bg-gold text-light text-md hover:opacity-90 w-full mt-2"
                    onClick={ handleSubmit }
                    disabled={ onProcess }
                >
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Adding Country</>) : "Add Country"}
                </Button>
            </div>
        </section>
    )
}