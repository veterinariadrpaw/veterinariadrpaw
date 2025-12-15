export interface Service {
    _id: string;
    name: string;
    description: string;
    basePrice: number;
    duration: number;
    isActive: boolean;
    supplies?: any[];
}
