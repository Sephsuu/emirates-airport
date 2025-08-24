export class Flight {
    id: string;
    flight_no: string;
    departure_time: string;
    arrival_time: string;
    route_id: string;
}

export class CreateFlightDTO {
    flight_no: string;
    departure_time: string;
    arrival_time: string;
    route_id: string;
}