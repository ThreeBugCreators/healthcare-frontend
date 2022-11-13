import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    config = {
        apiUrl: 'localhost:6969'
    }
    

    getAll() {
        return this.http.get<User[]>(`${this.config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.config.apiUrl}/users/${user._id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.config.apiUrl}/users/${id}`);
    }
}