export interface City {
    id?: string,
    name?: string,
    country_id?: string,
    country?: {
        id?: string,
        name?: string
    }
    created_at?: string,
}