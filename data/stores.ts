import { IStore } from "./IStore";
export const stores: IStore[] = [
    {
        name: "store1",
        products: [
            { name: "product1", unit: "EGP", price: 100 },
            { name: "product2", unit: "EGP", price: 200 },
        ]
    },
    {
        name: "store2",
        products: [
            { name: "product3", unit: "EGP", price: 300 },
            { name: "product4", unit: "EGP", price: 400 },
        ]
    },
    {
        name: "store3",
        products: [
            { name: "product5", unit: "EGP", price: 500 },
            { name: "product6", unit: "EGP", price: 600 },
            { name: "product7", unit: "EGP", price: 700 },
        ]
    },
    {
        name: "store4",
        products: [
            { name: "product8", unit: "EGP", price: 800 },
            { name: "product9", unit: "EGP", price: 900 },
        ]
    },
    {
        name: "store5",
        products: [
            { name: "product10", unit: "EGP", price: 1000 },
        ]
    },
];
