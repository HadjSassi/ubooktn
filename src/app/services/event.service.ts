import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../model/Event';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServeurUrl}/Event/all`);
    }

    public getCertification(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServeurUrl}/Event/Certification`);
    }

    public getCompetition(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServeurUrl}/Event/Competition`);
    }

    public getFormation(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServeurUrl}/Event/Formation`);
    }

    public getJourney(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.apiServeurUrl}/Event/Journey`);
    }


    getEventById(id: number): Observable<Event> {
        return this.http.get<Event>(`${this.apiServeurUrl}/Event/find/${id}`);
    }

    public addEvent(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.apiServeurUrl}/Event/add`, event);
    }

    public updateEvent(event: Event): Observable<Event> {
        return this.http.put<Event>(`${this.apiServeurUrl}/Event/update`, event);
    }

    public deleteEvent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Event/delete/${id}`);
    }

    public resetAffiche(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Event/deleteAffiche/${id}`);
    }

}
