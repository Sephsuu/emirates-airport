import { BASE_URL } from "@/lib/utils";
import { Airport } from "@/types/airport";

const URL = `${BASE_URL}/airports`;

export class AirportService {
    static async getAllAirports() {
        const res = await fetch(`${URL}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.')
        }

        return res.json();
    }

    static async createAirport(airport: Airport, imageFile?: File) {        
        const formData = new FormData();
        formData.append('name', airport.name?.toUpperCase()!);
        formData.append('country_id', airport.country_id!);
        if (imageFile) formData.append('image', imageFile);
        const res = await fetch(`${URL}`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.')
        }

        return res.json();
    }

    static async updateAirport(airport: Airport) {
        const res = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(airport)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.')
        }

        return res.json();
    }

    static async deleteAirport(id: string) {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.')
        }

        return res.json();
    }

}