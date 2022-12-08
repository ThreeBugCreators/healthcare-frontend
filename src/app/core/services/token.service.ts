import { Injectable } from '@angular/core';

const AccessTokenKey = 'auth-token';
const RefreshTokenKey = 'auth-refreshtoken';
const UserKey = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(AccessTokenKey);
    window.localStorage.setItem(AccessTokenKey, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(AccessTokenKey);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(RefreshTokenKey);
    window.localStorage.setItem(RefreshTokenKey, token);
  }

  public getRefreshToken(): string | null {
    try {
        const refreshToken = localStorage.getItem(RefreshTokenKey) || '';
        return refreshToken;
    } catch (error) {
        return null;
    }
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(UserKey);
    window.localStorage.setItem(UserKey, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(UserKey);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}