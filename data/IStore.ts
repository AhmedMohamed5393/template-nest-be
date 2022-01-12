export interface IProduct { name: string; unit: string; price: number; }
export interface IStore { name: string; products: IProduct[]; }
