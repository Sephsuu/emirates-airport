"use client"

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { handleChange } from "@/lib/form-handler";
import { CityService } from "@/service/cityService";
import { CountryService } from "@/service/countryService";
import { DestinationService } from "@/service/destinationService";
import { City } from "@/types/city";
import { Country } from "@/types/country";
import { SelectLabel } from "@radix-ui/react-select";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const destinationInit = {
    name: '',
    city_id: '',
    country_id: '',
    image_url: ''
}

export default function AddDestination() {
    const [loading, setLoading] = useState(true);
    const [onProcess, setProcess] = useState(false);

    const [destination, setDestination] = useState(destinationInit);
    const [cities, setCities] = useState<City[]>([]);
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const countriesRes = await CountryService.getAllCountries();
                const citiesRes = await CityService.getAllCities();
                setCountries(countriesRes);
                setCities(citiesRes);
            } catch (error) { toast.error(`${error}`) }
            finally { setLoading(false) }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (destination.country_id !== '') {
            setFilteredCities(cities.filter(i => i.country?.id === destination.country_id));
        } else { setFilteredCities(cities) }
    }, [destination.country_id, cities]);

    useEffect(() => {
        console.log(destination);
        
    }, [destination]);

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await DestinationService.createDestination(destination);
            if (data) toast.success(`${destination.name} added to countries.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setDestination(destinationInit);
        }
    }

    if (loading) return <Loader />
    return(
        <section className="w-full flex justify-center items-center">
            <Toaster closeButton position="top-center" />
            <div className="flex flex-col gap-4 p-4 bg-white shadow-md w-150 pb-12 border-1 border-slate-300">
                <div className="w-full flex items-center gap-2 my-1">
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
                    <div className="text-2xl font-emirates-bold text-center ml-2">Add a Destination</div>
                </div>
                <div>
                    <div className="text-md text-gray">City Name</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="name"
                        value={ destination.name }
                        onChange={ e => handleChange(e, setDestination) }
                    />
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <Select
                            name="country_id" 
                            value={ destination.country_id }
                            onValueChange={ value => setDestination(prev => ({
                                ...prev,
                                country_id: value
                            })) } 
                        >
                            <div className="text-md text-gray">Country</div>
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
                    <div className="w-full">
                        <Select
                            name="city_id" 
                            value={ destination.city_id }
                            onValueChange={ value => setDestination(prev => ({
                                ...prev,
                                city_id: value
                            })) } 
                        >
                            <div className="text-md text-gray">City</div>
                            <SelectTrigger 
                                className="w-full border-slate-400 border-1"
                                disabled={ destination.country_id === '' }
                            >
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Cities</SelectLabel>
                                    {filteredCities.map((item, index) => (
                                        <SelectItem key={ index } value={ item.id! }>{ item.name }</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <div className="text-md text-gray">Image URL</div>
                    <input
                        type="text"
                        className="w-full px-3 rounded-md py-1.5 text-md border-slate-400 border-1 uppercase"
                        name="image_url"
                        value={ destination.image_url }
                        onChange={ e => handleChange(e, setDestination) }
                    />
                </div>

                <Button
                    className="!bg-gold text-light text-md hover:opacity-90 w-full mt-2"
                    onClick={ handleSubmit }
                    disabled={ onProcess }
                >
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Adding Destination</>) : "Add Destination"}
                </Button>
            </div>
        </section>
    );
}