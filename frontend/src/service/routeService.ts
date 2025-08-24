import { BASE_URL } from "@/lib/utils"
import { Destination } from "@/types/destination";
import { Route } from "@/types/route";

const URL = `${BASE_URL}/routes`

export class RouteService {
    static async getAllRoutes() {
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

    static async createRoute(route: Route) {
        const res = await fetch(`${URL}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(route)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async updateRoute(route: Route) {
        const res = await fetch(`${URL}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(route)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Something went wrong.');
        }

        return res.json();
    }

    static async deleteRoute(id: string) {
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