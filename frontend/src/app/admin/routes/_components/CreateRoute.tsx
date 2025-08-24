import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoaderModal } from "@/components/ui/loader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AirportService } from "@/service/airportService";
import { CityService } from "@/service/cityService";
import { RouteService } from "@/service/routeService";
import { Airport } from "@/types/airport";
import { City } from "@/types/city";
import { Route } from "@/types/route";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const types = ['Single', 'Two-Way'];
const routeInit = {
    departure_airport_id: "",
    departure_city_id: "",
    arrival_airport_id: "",
    arrival_city_id: "",
    type: "",
}

interface Props {
    setOpen: Dispatch<SetStateAction<boolean>>;
    setReload: Dispatch<SetStateAction<boolean>>;
}

export function CreateRoute({ setOpen, setReload }: Props) {
    const [loading, setLoading] = useState(true);
    const [onProcess, setProcess]= useState(false);
    const [route, setRoute] = useState<Route>(routeInit);
    const [airportSearch, setAirportSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [airports, setAirports] = useState<Airport[]>([]);
    const [filteredAirports, setFilteredAirports] = useState<Airport[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [filteredCities, setFilteredCities] = useState<City[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const airportsRes = await AirportService.getAllAirports();
                const citiesRes = await CityService.getAllCities();
                setAirports(airportsRes);
                setCities(citiesRes);
            } catch (error) { toast.error(`${error}`) }
            finally { setLoading(false) }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const searchInput = airportSearch.trim().toUpperCase();
        if (searchInput !== "") {
            setFilteredAirports(
                airports.filter((item) => 
                    item.name?.includes(searchInput)
                )
            );
        } else setFilteredAirports(airports);
    }, [airportSearch, airports]);

    useEffect(() => {
        const searchInput = citySearch.trim().toUpperCase();
        if (searchInput !== "") {
            setFilteredCities(
                cities.filter((item) => 
                    item.name?.includes(searchInput)
                )
            );
        } else setFilteredCities(cities);
    }, [citySearch, cities]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    useEffect(() => {
        console.log(route);
    }, [route]);

    const handleSubmit = async () =>  {
        try {
            const res = await RouteService.createRoute(route);
            if (res) { toast.success('Route added successfully!') }
        } catch (error) { toast.error(`${error}`) }
        finally {
            setProcess(false);
            setReload(prev => !prev);
            setOpen(!open);
        }
    }

    if (loading) return <LoaderModal/>
    return(
        <Dialog open onOpenChange={ setOpen }>
            <DialogContent>
                <DialogTitle className="flex items-center gap-2">
                    <Image
                        src={ "/images/uae_logo.png" }
                        alt=""
                        className="w-7"
                        width={ 30 }
                        height={ 30 }
                    />
                    <div className="text-xl">Create Route</div>
                    <Image
                        src={ "/images/emirates_logo.png" }
                        alt=""
                        className="ms-auto mr-4 w-20"
                        width={ 90 }
                        height={ 90 }
                    />
                </DialogTitle>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div>Departure Airport</div>
                        <Select
                            onValueChange={ (value) => setRoute(prev => ({
                                ...prev,
                                departure_airport_id: value
                            })) }
                        >
                            <SelectTrigger 
                                onKeyDown={ handleKeyDown } 
                                className="w-full border-1 border-slate-300"
                            >
                                <SelectValue placeholder="Select Airport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <Input
                                        placeholder="Find an airport"
                                        onChange={ e => setAirportSearch(e.target.value) }
                                    />
                                    <SelectLabel>Airports</SelectLabel>
                                    {filteredAirports.map((item, index) => (
                                        <SelectItem
                                            value={ item.id! }
                                            key={ index }
                                        >
                                            { item.name }
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div>Departure City</div>
                        <Select
                            onValueChange={ (value) => setRoute(prev => ({
                                ...prev,
                                departure_city_id: value
                            })) }
                        >
                            <SelectTrigger 
                                onKeyDown={ handleKeyDown }
                                className="w-full border-1 border-slate-300"
                            >
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <Input
                                        // ref={ cityInputRef }
                                        placeholder="Find city"
                                        onChange={ e => setCitySearch(e.target.value) }
                                    />
                                    <SelectLabel>Airports</SelectLabel>
                                    {filteredCities.map((item, index) => (
                                        <SelectItem
                                            value={ item.id! }
                                            key={ index }
                                        >
                                            { item.name }
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div>Arrival Airport</div>
                        <Select
                            onValueChange={ (value) => setRoute(prev => ({
                                ...prev,
                                arrival_airport_id: value
                            })) }
                        >
                            <SelectTrigger 
                                onKeyDown={ handleKeyDown } 
                                className="w-full border-1 border-slate-300"
                            >
                                <SelectValue placeholder="Select Airport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <Input
                                        placeholder="Find an airport"
                                        onChange={ e => setAirportSearch(e.target.value) }
                                    />
                                    <SelectLabel>Airports</SelectLabel>
                                    {filteredAirports.map((item, index) => (
                                        <SelectItem
                                            value={ item.id! }
                                            key={ index }
                                        >
                                            { item.name }
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div>Arrival City</div>
                        <Select
                            onValueChange={ (value) => setRoute(prev => ({
                                ...prev,
                                arrival_city_id: value
                            })) }
                        >
                            <SelectTrigger 
                                onKeyDown={ handleKeyDown }
                                className="w-full border-1 border-slate-300"
                            >
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <Input
                                        // ref={ cityInputRef }
                                        placeholder="Find city"
                                        onChange={ e => setCitySearch(e.target.value) }
                                    />
                                    <SelectLabel>Airports</SelectLabel>
                                    {filteredCities.map((item, index) => (
                                        <SelectItem
                                            value={ item.id! }
                                            key={ index }
                                        >
                                            { item.name }
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <div>Route Type</div>
                        <Select
                            onValueChange={ (value) => setRoute(prev => ({
                                ...prev,
                                type: value
                            })) }
                        >
                            <SelectTrigger 
                                onKeyDown={ handleKeyDown }
                                className="w-full border-1 border-slate-300"
                            >
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Route Type</SelectLabel>
                                    {types.map((item, index) => (
                                        <SelectItem
                                            value={ item }
                                            key={ index }
                                        >
                                            { item }
                                        </SelectItem>
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
                    {onProcess ? (<><LoaderCircle className="w-4 h-4 animate-spin text-light" />Adding Route</>) : "Add Route"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}