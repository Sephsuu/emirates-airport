import { BASE_URL } from "@/lib/utils";
import { Country } from "@/types/country";

const URL = `${BASE_URL}/countries`;

export class CountryService {
    static async getAllCountries() {
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

    static async createCountry(country: Country) {
        const payload = {
            ...country, 
            code: country.code && country.code.toUpperCase(),
            name: country.name && country.name.toUpperCase(),
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

    static async updateCountry(country: Country) {
        const payload = {
            ...country, 
            code: country.code && country.code.toUpperCase(),
            name: country.name && country.name.toUpperCase(),
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

    static async deleteCountry(id: string) {
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