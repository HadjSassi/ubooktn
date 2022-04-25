import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentDocument} from '../model/CommentDocument';
import {Document} from '../model/Document';

@Injectable({
    providedIn: 'root'
})
export class CommentDocumentService {
    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getCommentDocuments(): Observable<CommentDocument[]> {
        return this.http.get<CommentDocument[]>(`${this.apiServeurUrl}/comment_document/all`);
    }

    public getCommentDocumentsByDocument(id: number): Observable<CommentDocument[]> {
        return this.http.get<CommentDocument[]>(`${this.apiServeurUrl}/comment_document/allForOne/${id}`);
    }

    public getCommentDocumentById(id: number): Observable<CommentDocument> {
        return this.http.get<CommentDocument>(`${this.apiServeurUrl}/comment_document/find/${id}`);
    }

    public addCommentDocument(commentDocument: CommentDocument): Observable<CommentDocument> {
        return this.http.post<CommentDocument>(`${this.apiServeurUrl}/comment_document/add`, commentDocument);
    }


    public updateCommentDocument(commentDocument: CommentDocument): Observable<CommentDocument> {
        return this.http.put<CommentDocument>(`${this.apiServeurUrl}/comment_document/update`, commentDocument);
    }

    public deleteCommentDocument(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/comment_document/delete/${id}`);
    }
}
