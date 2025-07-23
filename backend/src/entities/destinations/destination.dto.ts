export class DestinationDTO {
    id: string;
    name: string;
    city_id: string;
    country_id: string;
    image_url: string;
}

export class CreateDestinationDTO {
    name: string;
    city_id: string;
    country_id: string;
    image_url: string;
}