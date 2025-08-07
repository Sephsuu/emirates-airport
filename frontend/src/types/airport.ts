export interface Airport {
    id?: string;
    name?: string;
    logo_url: string;
    country_id?: string;

    country?: {
        id?: string;
        name?: string;
    }
}