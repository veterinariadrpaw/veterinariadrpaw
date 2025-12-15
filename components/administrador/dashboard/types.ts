export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export interface DashboardStats {
    totalUsers: number;
    vets: number;
    clients: number;
}
