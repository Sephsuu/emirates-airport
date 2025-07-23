export interface City {
    id?: string,
    name?: string,
    country_id?: string,
    created_at?: string,

    country?: {
        id?: string,
        name?: string
    }
}