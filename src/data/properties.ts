export interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    area: string;
    type: 'sale' | 'rent';
    image: string;
}

export const properties: Property[] = [
    {
        id: 1,
        title: "Luxury Villa with Pool",
        price: "PKR 4.5 Crore",
        location: "DHA Phase 6, Lahore",
        beds: 5,
        baths: 6,
        area: "1 Kanal",
        type: 'sale',
        image: "./images/property-1.jpg"
    },
    {
        id: 2,
        title: "Modern Apartment",
        price: "PKR 85 Lakh",
        location: "Bahria Town, Islamabad",
        beds: 2,
        baths: 2,
        area: "1200 Sq.ft",
        type: 'sale',
        image: "./images/property-2.jpg"
    },
    {
        id: 3,
        title: "Commercial Space",
        price: "PKR 2.5 Lakh/Month",
        location: "Blue Area, Islamabad",
        beds: 0,
        baths: 2,
        area: "2000 Sq.ft",
        type: 'rent',
        image: "./images/property-3.jpg"
    },
    {
        id: 4,
        title: "Spacious Family Home",
        price: "PKR 3.2 Crore",
        location: "Gulberg Greens, Islamabad",
        beds: 4,
        baths: 5,
        area: "10 Marla",
        type: 'sale',
        image: "./images/property-4.jpg"
    },
    {
        id: 5,
        title: "Furnished Apartment",
        price: "PKR 65,000/Month",
        location: "E-11, Islamabad",
        beds: 2,
        baths: 2,
        area: "1100 Sq.ft",
        type: 'rent',
        image: "./images/property-5.jpg"
    },
    {
        id: 6,
        title: "Luxury Penthouse",
        price: "PKR 6.5 Crore",
        location: "Clifton, Karachi",
        beds: 3,
        baths: 4,
        area: "2500 Sq.ft",
        type: 'sale',
        image: "./images/property-6.jpg"
    }
];
