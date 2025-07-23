import { BASE_URL } from "@/lib/utils";
import { City } from "@/types/city";

const URL = `${BASE_URL}/cities`;

export class CityService {
    static async  getAllCities() {
        const res = await fetch(`${URL}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Something went wrong"); 
        }

        return res.json();
    }

    static async createCity(city: City) {
        console.log(city);
        
        const payload = {
            ...city, 
            name: city.name && city.name.toUpperCase(),
        }
        
        const res = await fetch(`${URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Something went wrong"); 
        }

        return res.json();
    }

    static async updateCity(city: City) {
        const { country, ...payload } = {
            ...city, 
            name: city.name && city.name.toUpperCase(),
        }

        const res = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Something went wrong"); 
        }

        return res.json();
    }

    static async deleteCity(id: string) {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Something went wrong"); 
        }

        return res.json();
    }

}