import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CentreFormation} from '../model/CentreFormation';

@Injectable({
    providedIn: 'root'
})
export class CentreFormationService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getCentreFormations(): Observable<CentreFormation[]> {
        return this.http.get<CentreFormation[]>(`${this.apiServeurUrl}/CentreFormation/all`);
    }


    getCentreFormationById(id: number): Observable<CentreFormation> {
        return this.http.get<CentreFormation>(`${this.apiServeurUrl}/CentreFormation/find/${id}`);
    }

    public addCentreFormation(centreFormation: CentreFormation): Observable<CentreFormation> {
        return this.http.post<CentreFormation>(`${this.apiServeurUrl}/CentreFormation/add`, centreFormation);
    }

    public updateCentreFormation(centreFormation: CentreFormation): Observable<CentreFormation> {
        return this.http.put<CentreFormation>(`${this.apiServeurUrl}/CentreFormation/update`, centreFormation);
    }

    public deleteCentreFormation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/CentreFormation/delete/${id}`);
    }


}
