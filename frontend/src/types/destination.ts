export type Destination = {
    id?: string;
    name?: string;
    city_id?: string;
    country_id?: string;
    image_url?: string;

    city?: {
        id: string,
        name: string
    },
    country?: {
        id: string;
        name: string;
    }
}