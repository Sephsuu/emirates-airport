import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Loader, { LoaderModal } from "@/components/ui/loader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleChange } from "@/lib/form-handler";
import { CityService } from "@/service/cityService";
import { CountryService } from "@/service/countryService";
import { DestinationService } from "@/service/destinationService";
import { City } from "@/types/city";
import { Country } from "@/types/country"
import { Destination } from "@/types/destination";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

type Props = {
    toUpdate: Destination,
    setUpdate: (i: Destination | undefined) => void;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateDestination({ toUpdate, setUpdate, setReload }: Props) {
    const [loading, setLoading] = useState(true);
    const [onProcess, setProcess] = useState(false);

    const [destination, setDestination] = useState(toUpdate);
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
        console.log('Cities', cities);
        console.log('Countries', countries);
        const city: City | undefined = cities.find(i => i.id === destination.city?.id);
        console.log('City:',city);
        
        setDestination(prev => ({
            ...prev,
            country_id: city?.country?.id,
            city_id: city?.id
        }));
    }, [countries, cities]);

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await DestinationService.updateDestination(destination);
            if (data) toast.success(`${data.name} updated successfully.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setUpdate?.(undefined);
            setReload(prev => !prev);
        }
    }
    
    if (loading) return <LoaderModal />
    return(
        <Dialog open onOpenChange={open => { if (!open) setUpdate?.(undefined); }}>
            <DialogContent>
                <DialogTitle className="flex items-center gap-4">
                    <div><img src="/images/emirates_logo.png" className="w-12"  /></div>
                    <img src="/images/uae_logo.png" className="w-5"  />
                    <div className="text-md">Update Destination: <span className="text-darkred">{ toUpdate.name }</span></div>
                </DialogTitle>

                <div>
                    <div className="text-md text-gray">Destination Name</div>
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

                <div className="flex justify-end gap-2">
                    <DialogClose asChild><Button variant="secondary" size="sm">Cancel</Button></DialogClose>
                    <Button
                        onClick={ handleSubmit }
                        className="!bg-gold hover:opacity-90"
                        size="sm"
                        disabled={ onProcess }
                    >
                        {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Updating</>) : "Update"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}