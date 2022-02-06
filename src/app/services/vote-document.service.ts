import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VoteDocument} from '../model/VoteDocument';

@Injectable({
    providedIn: 'root'
})
export class VoteDocumentService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getVoteDocuments(): Observable<VoteDocument[]> {
        return this.http.get<VoteDocument[]>(`${this.apiServeurUrl}/vote_document/all`);
    }

    public getVoteDocumentById(id: number): Observable<VoteDocument> {
        return this.http.get<VoteDocument>(`${this.apiServeurUrl}/vote_document/find/${id}`);
    }

    public addVoteDocument(voteDocument: VoteDocument): Observable<VoteDocument> {
        return this.http.post<VoteDocument>(`${this.apiServeurUrl}/vote_document/add`, voteDocument);
    }


    public updateVoteDocument(voteDocument: VoteDocument): Observable<VoteDocument> {
        return this.http.put<VoteDocument>(`${this.apiServeurUrl}/vote_document/update`, voteDocument);
    }

    public deleteVoteDocument(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/vote_document/delete/${id}`);
    }

}
