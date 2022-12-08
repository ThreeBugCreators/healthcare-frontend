export interface User {
    _id?: number;
    username: string;
    password?: string;
    name: string;
    surname: string;
    email: string;
    accessToken?: string;
    refreshToken?: string;
}