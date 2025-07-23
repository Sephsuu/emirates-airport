import { BASE_URL } from "@/lib/utils"
import { Destination } from "@/types/destination";

const URL = `${BASE_URL}/destinations`

export class DestinationService {
    static async getAllDestinations() {
        const res = await fetch(`${URL}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Bad Response");

        return res.json();
    }

    static async createDestination(destination: Destination) {
        const res = await fetch(`${URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(destination)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }
}