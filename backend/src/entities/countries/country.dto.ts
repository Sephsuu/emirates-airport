enum Continent {
    ASIA = 'ASIA',
    AFRICA = 'AFRICA',
    ANTARCTICA = 'ANTARCTICA',
    EUROPE = 'EUROPE',
    NORTH_AMERICA = 'NORTH AMERICA',
    OCEANIA = 'OCEANIA',
    SOUTH_AMERICA = 'SOUTH AMERICA'

}
export class CountryDTO {
    id: string;
    code: string;
    name: string;
    continent: Continent;
    image_url: string;
}

export class CreateCountryDTO {
    code: string;
    name: string;
    continent: Continent;
    image_url: string;
}