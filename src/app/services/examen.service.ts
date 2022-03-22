import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Examen} from '../model/Examen';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ExamenService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getExamens(): Observable<Examen[]> {
        return this.http.get<Examen[]>(`${this.apiServeurUrl}/examen/all`);
    }


    getExamenById(id: number): Observable<Examen> {
        return this.http.get<Examen>(`${this.apiServeurUrl}/examen/find/${id}`);
    }

    public addExamen(examen: Examen): Observable<Examen> {
        return this.http.post<Examen>(`${this.apiServeurUrl}/examen/add`, examen);
    }

    public deleteExamen(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/examen/delete/${id}`);
    }


    uploadFile(file: File): Observable<HttpEvent<{}>> {
        /*return new Promise (
            (resolve, reject) => {
                /!*console.log(file.name);
                const upload = firebase.storage().ref()
                    .child('Examen/' + file.name)
                    .put(file);
                console.log(upload);
                upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {
                        console.log('Chargement...');
                    },
                    (error) => {
                        console.log('Erreur de chargement : ' + error);
                        reject();
                    },
                    () => {
                        resolve(upload.snapshot.ref.getDownloadURL());
                    }
                );*!/
                // lahna bech n7ot el controlleur mte3na ye5dem kol chay
                const formData: FormData = new FormData();
                formData.append('file', file);
                const req = new HttpRequest('POST', 'http://localhost:8081/upload/Examen', formData, {
                    reportProgress: true,
                    responseType: 'text'
                });
                this.http.request(req);
                resolve(environment.localStoragePath + 'Examen/' + file.name);
            }
        );*/
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', 'http://localhost:8081/upload/Examen', data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(newRequest);
    }

}
