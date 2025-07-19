import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleChange } from "@/lib/form-handler";
import { CountryService } from "@/service/countryService";
import { Country } from "@/types/country"
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react"
import { toast } from "sonner";

const continents = ["ASIA", "AFRICA", "ANTARCTICA", "EUROPE", "NORTH AMERICA", "OCEANIA", "SOUTH AMERICA"];

type Props = {
    toUpdate: Country,
    setUpdate: (i: Country | undefined) => void;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateCountry({ toUpdate, setUpdate, setReload }: Props) {
    const [country, setCountry] = useState(toUpdate);
    const [onProcess, setProcess] = useState(false);

    async function handleSubmit() {
        try {
            setProcess(true);
            const data = await CountryService.updateCountry(country);
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
                    <div className="text-md">Update Country: <span className="text-darkred">{ toUpdate.name }</span></div>
                </DialogTitle>

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