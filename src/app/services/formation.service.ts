import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Formation} from '../model/Formation';

@Injectable({
    providedIn: 'root'
})
export class FormationService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getFormations(): Observable<Formation[]> {
        return this.http.get<Formation[]>(`${this.apiServeurUrl}/Formation/all`);
    }


    getFormationById(id: number): Observable<Formation> {
        return this.http.get<Formation>(`${this.apiServeurUrl}/Formation/find/${id}`);
    }

    public addFormation(formation: Formation): Observable<Formation> {
        return this.http.post<Formation>(`${this.apiServeurUrl}/Formation/add`, formation);
    }

    public updateFormation(formation: Formation): Observable<Formation> {
        return this.http.put<Formation>(`${this.apiServeurUrl}/Formation/update`, formation);
    }

    public deleteFormation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Formation/delete/${id}`);
    }

}
