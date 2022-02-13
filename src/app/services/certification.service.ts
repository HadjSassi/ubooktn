import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certification} from '../model/Certification';

@Injectable({
    providedIn: 'root'
})
export class CertificationService {
    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getCertifications(): Observable<Certification[]> {
        return this.http.get<Certification[]>(`${this.apiServeurUrl}/Certification/all`);
    }


    getCertificationById(id: number): Observable<Certification> {
        return this.http.get<Certification>(`${this.apiServeurUrl}/Certification/find/${id}`);
    }

    public addCertification(certification: Certification): Observable<Certification> {
        return this.http.post<Certification>(`${this.apiServeurUrl}/Certification/add`, certification);
    }

    public updateCertification(certification: Certification): Observable<Certification> {
        return this.http.put<Certification>(`${this.apiServeurUrl}/Certification/update`, certification);
    }

    public deleteCertification(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/Certification/delete/${id}`);
    }

}
