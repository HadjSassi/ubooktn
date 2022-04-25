import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Institus} from '../model/Institus';

@Injectable({
    providedIn: 'root'
})
export class InstitusService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getInstituss(): Observable<Institus[]> {
        return this.http.get<Institus[]>(`${this.apiServeurUrl}/institus/all`);
    }


    getInstitusById(id: number): Observable<Institus> {
        return this.http.get<Institus>(`${this.apiServeurUrl}/institus/find/${id}`);
    }

    public addInstitus(institus: Institus): Observable<Institus> {
        return this.http.post<Institus>(`${this.apiServeurUrl}/institus/add`, institus);
    }

    public updateInstitus(institus: Institus): Observable<Institus> {
        return this.http.put<Institus>(`${this.apiServeurUrl}/institus/update`, institus);
    }

    public deleteInstitus(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/institus/delete/${id}`);
    }


}
