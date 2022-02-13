import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Journey} from '../model/Journey';

@Injectable({
    providedIn: 'root'
})
export class JourneyService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getJourneys(): Observable<Journey[]> {
        return this.http.get<Journey[]>(`${this.apiServeurUrl}/Journey/all`);
    }


    getJourneyById(id: number): Observable<Journey> {
        return this.http.get<Journey>(`${this.apiServeurUrl}/Journey/find/${id}`);
    }

    public addJourney(journey: Journey): Observable<Journey> {
        return this.http.post<Journey>(`${this.apiServeurUrl}/Journey/add`, journey);
    }

    public updateJourney(journey: Journey): Observable<Journey> {
        return this.http.put<Journey>(`${this.apiServeurUrl}/Journey/update`, journey);
    }

    public deleteJourney(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Journey/delete/${id}`);
    }

}
