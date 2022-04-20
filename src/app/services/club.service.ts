import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Club} from '../model/Clubs';

@Injectable({
    providedIn: 'root'
})
export class ClubService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getClubs(): Observable<Club[]> {
        return this.http.get<Club[]>(`${this.apiServeurUrl}/club/all`);
    }


    getClubById(id: number): Observable<Club> {
        return this.http.get<Club>(`${this.apiServeurUrl}/club/find/${id}`);
    }

    public addClub(club: Club): Observable<Club> {
        return this.http.post<Club>(`${this.apiServeurUrl}/club/add`, club);
    }

    public updateClub(club: Club): Observable<Club> {
        return this.http.put<Club>(`${this.apiServeurUrl}/club/update`, club);
    }

    public deleteClub(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/club/delete/${id}`);
    }


}
