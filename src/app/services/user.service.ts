import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.apiServeurUrl}/user/all`);
    }

    getUserByUid(uid: string): Observable<User> {
        return this.http.get<User>(`${this.apiServeurUrl}/user/findUid/${uid}`);
    }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServeurUrl}/user/add`, user);
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServeurUrl}/user/update`, user);
    }

    public resetUrlPic(uid: string): Observable<User> {
        return this.http.delete<User>(`${this.apiServeurUrl}/user/deletePicUser/${uid}`);
    }

    public resetPassword(email: string): Observable<User> {
        return this.http.post<User>(`${this.apiServeurUrl}/user/forget`, email);
    }

    uploadFile(file: File): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', 'http://localhost:8081/upload/PicUser', data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(newRequest);
    }


}
