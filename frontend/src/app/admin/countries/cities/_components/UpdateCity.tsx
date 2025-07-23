import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleChange } from "@/lib/form-handler";
import { CityService } from "@/service/cityService";
import { CountryService } from "@/service/countryService";
import { City } from "@/types/city";
import { Country } from "@/types/country";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react"
import { toast } from "sonner";

type Props = {
    toUpdate: City,
    setUpdate: (i: City | undefined) => void;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateCity({ toUpdate, setUpdate, setReload }: Props) {
    const [city, setCity] = useState(toUpdate);
    const [onProcess, setProcess] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await CountryService.getAllCountries();
                setCountries(data);
            } catch (error) { toast.success(`${error}`) }
        }
        fetchData();
    }, []);

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await CityService.updateCity(city);
            if (data) toast.success(`${data.name} updated successfully.`);

        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setUpdate?.(undefined);
            setReload(prev => !prev);
        }
    }
    
    return(
        <Dialog open onOpenChange={open => { if (!open) setUpdate?.(undefined); }}>
            <DialogContent>
                <DialogTitle className="flex items-center gap-4">
                    <div><img src="/images/emirates_logo.png" className="w-12"  /></div>
                    <img src="/images/uae_logo.png" className="w-5"  />
                    <div className="text-md">Update City: <span className="text-darkred">{ toUpdate.name }</span></div>
                </DialogTitle>

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
                        name="country_id" 
                        value={ city.country_id }
                        onValueChange={ value => setCity(prev => ({
                            ...prev,
                            country_id: value
                        })) } 
                    >
                        <div className="text-md text-gray">Country</div>
                        <SelectTrigger className="w-full border-slate-400 border-1">
                            <SelectValue 
                                placeholder={ city.country?.name } 
                                aria-label={ countries.find((item) => item.id === city.country_id)?.name }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Continents</SelectLabel>
                                {countries.map((item, index) => (
                                    <SelectItem key={ index } value={ item.id! }>{ item.name }</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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