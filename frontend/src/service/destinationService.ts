import { BASE_URL } from "@/lib/utils"
import { Destination } from "@/types/destination";

const URL = `${BASE_URL}/destinations`

export class DestinationService {
    static async getAllDestinations() {
        const res = await fetch(`${URL}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async createDestination(destination: Destination) {
        const payload = {
            ...destination,
            name: destination.name?.toUpperCase()
        }
        const res = await fetch(`${URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async updateDestination(destination: Destination) {
        delete destination.city; delete destination.country;
        const payload = {
            ...destination,
            name: destination.name?.toUpperCase()
        }
        
        const res = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async deleteDestination(id: string) {
        const res = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }
}