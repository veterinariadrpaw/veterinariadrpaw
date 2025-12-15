export interface Product {
    _id: string;
    name: string;
    category: string;
    quantity: number;
    unitCost: number;
    salePrice: number;
    minStock: number;
    expiryDate?: string;
}
