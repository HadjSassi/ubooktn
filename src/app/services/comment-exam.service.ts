import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentExam} from '../model/CommentExam';

@Injectable({
    providedIn: 'root'
})
export class CommentExamService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getCommentExams(): Observable<CommentExam[]> {
        return this.http.get<CommentExam[]>(`${this.apiServeurUrl}/comment_exam/all`);
    }

    public getCommentExamById(id: number): Observable<CommentExam> {
        return this.http.get<CommentExam>(`${this.apiServeurUrl}/comment_exam/find/${id}`);
    }

    public addCommentExam(commentExam: CommentExam): Observable<CommentExam> {
        return this.http.post<CommentExam>(`${this.apiServeurUrl}/comment_exam/add`, commentExam);
    }


    public updateCommentExam(commentExam: CommentExam): Observable<CommentExam> {
        return this.http.put<CommentExam>(`${this.apiServeurUrl}/comment_exam/update`, commentExam);
    }

    public deleteCommentExam(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/comment_exam/delete/${id}`);
    }


}
