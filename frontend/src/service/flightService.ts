import { BASE_URL } from "@/lib/utils"
import { Flight } from "../types/flight";

const URL = `${BASE_URL}/flights`

export class FlightService {
    static async getAllFlights() {
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

    static async createFlight(flight: Flight) {
        const res = await fetch(`${URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async updateFlight(flight: Flight) {
        const res = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(flight)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async deleteFlight(id: string) {
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