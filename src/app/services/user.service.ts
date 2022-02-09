import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${this.apiServeurUrl}/user/find/${id}`);
    }

    public addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServeurUrl}/user/add`, user);
    }

    public updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiServeurUrl}/user/update`, user);
    }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                const upload = firebase.storage().ref()
                    .child('PicUser/' + file.name)
                    .put(file);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement...');
                    },
                    (error) => {
                        console.log('Erreur de chargement : ' + error.message);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );
            }
        );
    }


}
