import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Competition} from '../model/Competition';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getCompetitions(): Observable<Competition[]> {
        return this.http.get<Competition[]>(`${this.apiServeurUrl}/Competition/all`);
    }


    getCompetitionById(id: number): Observable<Competition> {
        return this.http.get<Competition>(`${this.apiServeurUrl}/Competition/find/${id}`);
    }

    public addCompetition(competition: Competition): Observable<Competition> {
        return this.http.post<Competition>(`${this.apiServeurUrl}/Competition/add`, competition);
    }

    public updateCompetition(competition: Competition): Observable<Competition> {
        return this.http.put<Competition>(`${this.apiServeurUrl}/Competition/update`, competition);
    }

    public deleteCompetition(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Competition/delete/${id}`);
    }

}
