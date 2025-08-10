export class RouteDTO {
    id: string;
    departure_airport_id: string;
    departure_city_id: string;
    arrival_airport_id: string;
    arrival_city_id: string;
    type: string;
}

export class CreateRouteDTO {
    departure_airport_id: string;
    departure_city_id: string;
    arrival_airport_id: string;
    arrival_city_id: string;
    type: string;
}