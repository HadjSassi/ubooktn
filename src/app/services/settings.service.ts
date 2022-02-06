import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../model/Settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getSettingss(): Observable<Settings[]> {
        return this.http.get<Settings[]>(`${this.apiServeurUrl}/settings/all`);
    }

    getSettingsById(id: number): Observable<Settings> {
        return this.http.get<Settings>(`${this.apiServeurUrl}/settings/find/${id}`);
    }

    public addSettings(settings: Settings): Observable<Settings> {
        return this.http.post<Settings>(`${this.apiServeurUrl}/settings/add`, settings);
    }

    public updateSettings(settings: Settings): Observable<Settings> {
        return this.http.put<Settings>(`${this.apiServeurUrl}/settings/update`, settings);
    }

}
