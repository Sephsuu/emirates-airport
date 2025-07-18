
// Navigation
export const navigationRoutes = [
    { 
        title: "Home",
        children: [
            { title: "Home1", link: "/" },
            { title: "Home2", link: "/" },
            { title: "Home3", link: "/" },
            { title: "Home4", link: "/" },
        ]
    },{ 
        title: "Flights",
        children: [
            { title: "Flights1", link: "/" },
            { title: "Flights1", link: "/" },
            { title: "Flights1", link: "/" },
            { title: "Flights1", link: "/" },
        ]
    },{ 
        title: "Passenger",
        children: [
            { title: "Passenger1", link: "/" },
            { title: "Passenger1", link: "/" },
            { title: "Passenger1", link: "/" },
            { title: "Passenger1", link: "/" },
        ]
    },{ 
        title: "Explore",
        children: [
            { title: "Explore1", link: "/" },
            { title: "Explore1", link: "/" },
            { title: "Explore1", link: "/" },
            { title: "Explore1", link: "/" },
        ]
    },
    { 
        title: "More",
        children: [
            { title: "More1", link: "/" },
            { title: "More1", link: "/" },
            { title: "More1", link: "/" },
            { title: "More1", link: "/" },
        ]
    },
]

// Hompage - Hero
export const heroContinents = [
    { continent: "Asia", link: "#" },
    { continent: "Europe", link: "#" },
    { continent: "Oceania", link: "#" },
    { continent: "North America", link: "#" },
    { continent: "South America", link: "#" },
]

// Homepage - BookFlight
export const bookFlighTabs = [
    { title: "Search Flight", onclick: null },
    { title: "Manage Booking", onclick: null },
    { title: "Flight Status", onclick: null },
]

// Flight Status
export const flightStatus = [
    { 
        flightNo: "PHI 452", 
        departure: "Manila, Phillipines", 
        arrival: "Riyadh, Saudi Arabia", 
        departureTime: "2025-03-14 09:30:00", 
        arrivalTime: "2025-07-16 013:30:00", 
        flightStatus: "SCHEDULED", 
        gate: 5 
    },
    { 
        flightNo: "POL 997", 
        departure: "Warsaw, Poland", 
        arrival: "Riyadh, Saudi Arabia", 
        departureTime: "2025-03-14 09:30:00", 
        arrivalTime: "2025-07-17 013:30:00", 
        flightStatus: "SCHEDULED", 
        gate: 5 
    },
    { 
        flightNo: "ESP 9P0", 
        departure: "Riyadh, Saudi Arabia", 
        arrival: "Madrid, Spain", 
        departureTime: "2025-03-14 09:30:00", 
        arrivalTime: "2025-07-17 013:30:00", 
        flightStatus: "SCHEDULED", 
        gate: 5 
    },
]

// Homepage - TripsActivities
export const tripsImages = [
    "https://i.pinimg.com/1200x/5c/54/3b/5c543b0d9df131f197e4a5d6b5d53ce1.jpg",
    "https://i.pinimg.com/1200x/5e/fd/19/5efd197abaa27f606daf103fbfbe283d.jpg",
    "https://i.pinimg.com/1200x/96/19/e6/9619e65daedadc265018d1075ed2c252.jpg",
    "https://i.pinimg.com/1200x/6c/81/14/6c8114b550891ccdacd97de0850f09f4.jpg"
    ,

]
export const tripsDestination = [
    { country: "Indonesia", city: "Bali", link: "https://i.pinimg.com/1200x/4d/77/82/4d77821a0c3fa263bb68fcc81d963c20.jpg" },
    { country: "Peru", city: "Urubamba", link: "https://i.pinimg.com/736x/44/e6/3f/44e63fd319fe4ca864502c5819b45a6e.jpg" },
    { country: "Iceland", city: "Vatnajökull", link: "https://i.pinimg.com/736x/10/20/90/102090e4af5ffebf92a223b747f74896.jpg" },
    { country: "Saudi Arabia", city: "Riyadh", link: "https://i.pinimg.com/1200x/38/1d/5b/381d5b39f4cf982d3bc779463073b0b1.jpg" },
    { country: "Austria", city: "Vienna", link: "https://i.pinimg.com/1200x/89/41/ef/8941ef207980ea63d801a6ef23e32325.jpg" },

    { country: "Australia", city: "Sydney", link: "https://i.pinimg.com/736x/6c/ec/04/6cec04f23f62d8360e1c8a25cb9aad0a.jpg" },
    { country: "Brazil", city: "Rio de Jenerio", link: "https://i.pinimg.com/1200x/76/29/28/762928c964f55d30b82368cc16838f0b.jpg" },
    { country: "South Korea", city: "Seoul", link: "https://i.pinimg.com/1200x/43/fb/eb/43fbeb3e398dd94a37965ef25937be22.jpg" },
    { country: "United States of America", city: "Los Angeles", link: "https://i.pinimg.com/736x/57/68/fe/5768fe644c81a2e3e8c56ca08bb2d4a1.jpg" },
    { country: "Italy", city: "Rome", link: "https://i.pinimg.com/736x/74/f7/a0/74f7a0855a495544833890b5d76a27db.jpg" },
    
];

export const partnerAirlines = [
    "air-canada.svg", "air-france.svg", "airasia.svg",
    "british-airways.svg", "delta-airline.svg", "eithad-airways.svg",
    "southwest.svg", "ph-airline.svg", "qatar-airways.svg"

];