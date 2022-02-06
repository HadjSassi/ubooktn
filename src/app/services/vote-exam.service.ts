import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VoteExam} from '../model/VoteExam';

@Injectable({
    providedIn: 'root'
})
export class VoteExamService {

    private apiServeurUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getVoteExams(): Observable<VoteExam[]> {
        return this.http.get<VoteExam[]>(`${this.apiServeurUrl}/vote_exam/all`);
    }


    public addVoteExam(voteDocument: VoteExam): Observable<VoteExam> {
        return this.http.post<VoteExam>(`${this.apiServeurUrl}/vote_exam/add`, voteDocument);
    }


    public updateVoteExam(voteDocument: VoteExam): Observable<VoteExam> {
        return this.http.put<VoteExam>(`${this.apiServeurUrl}/vote_exam/update`, voteDocument);
    }

    public deleteVoteExam(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServeurUrl}/vote_exam/delete/${id}`);
    }

}
