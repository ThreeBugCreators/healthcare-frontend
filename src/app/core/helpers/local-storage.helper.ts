import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

const localStorageBehaviourSubject = new BehaviorSubject<any>({});

export class LocalStorageHelper {
    public static setUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
        localStorageBehaviourSubject.next(user);
    }

    public static next(data: any) {
        localStorageBehaviourSubject.next(data);
    }

    public static getCurrentUser(): Observable<any> {
        return localStorageBehaviourSubject.asObservable();
    }
}