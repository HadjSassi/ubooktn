import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Document} from '../model/Document';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getDocuments(): Observable<Document[]> {
        return this.http.get<Document[]>(`${this.apiServeurUrl}/document/all`);
    }


    getDocumentById(id: number): Observable<Document> {
        return this.http.get<Document>(`${this.apiServeurUrl}/document/find/${id}`);
    }

    public addDocument(document: Document): Observable<Document> {
        return this.http.post<Document>(`${this.apiServeurUrl}/document/add`, document);
    }


    public deleteDocument(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/document/delete/${id}`);
    }

    uploadFile(file: File) {
        return new Promise(
            (resolve, reject) => {
                console.log(file.name);
                const upload = firebase.storage().ref()
                    .child('Documents/' + file.name)
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
                );
            }
        );
    }

}
