import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../model/User';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-all-profils',
    templateUrl: './all-profils.component.html',
    styleUrls: ['./all-profils.component.css']
})
export class AllProfilsComponent implements OnInit {

    users: User[] = [];
    usersA: User[] = [];
    rang: User[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(
            (response: User[]) => {
                this.users = response;
                this.usersA = this.users.slice(0);
                this.usersA.sort(function (a, b) {
                        const x = b.score - a.score;
                        if (x === 0) {
                            if (a.nomUser + a.prenomUser > b.nomUser + b.prenomUser) {
                                return 1;
                            } else if (a.nomUser + a.prenomUser < b.nomUser + b.prenomUser) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                        return b.score - a.score;
                    }
                );
                this.rang = this.usersA;
                let i = 0;
                const result: User[] = [];
                for (const u of this.usersA) {
                    result.push(u);
                    i++;
                    if (i === 20) {
                        break;
                    }
                }
                this.usersA = result;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: User[] = [];
        for (const doc of this.users) {
            if (doc.nomUser.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.prenomUser.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(doc);
            }
        }
        this.usersA = results;
        if (results.length === 0 || !key) {
            this.getUsers();
        }
    }


}
