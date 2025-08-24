export interface Route {
    id?: string;
    destination_airport_id?: string;
    destination_city_id?: string;
    arrival_airport_id?: string;
    arrival_city_id?: string;
    type?: string;
    created_at?: string;

    departure_airport?: {
        id: string;
        name: string;
        logo_url: string;
    };
    departure_city?: {
        id: string;
        name: string;
    };
    arrival_airport?: {
        id: string;
        name: string;
        logo_url: string;
    };
    arrival_city?: {
        id: string;
        name: string;
    };
}