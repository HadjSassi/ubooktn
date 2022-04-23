import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {User} from '../../../model/User';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';


@Component({
    selector: 'app-one-profil',
    templateUrl: './one-profil.component.html',
    styleUrls: ['./one-profil.component.css']
})
export class OneProfilComponent implements OnInit {

    public isAdmin = false;
    // @ts-ignore
    foulen: User;
    // @ts-ignore
    foulen2: User;
    mail = false;
    fb = false;
    li = false;
    rang = 0;
    users: User[] = [];
    usersA: User[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.userService.getUsers().subscribe(
            (response: User[]) => {
                const id = this.route.snapshot.params['id'];
                /*let uid = '';
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            uid = user.uid.toString();
                            this.userService.getUserByUid(uid).subscribe(
                                (responses: User) => {
                                    this.foulen2 = responses;
                                    if (this.foulen2.mailUser === environment.admine) {
                                        this.isAdmin = true
                                    }
                                },
                                (error: HttpErrorResponse) => {
                                    alert(error.message);
                                }
                            );
                        }
                    }
                );*/
                this.users = response;
                this.usersA = this.users.slice(0);
                this.usersA.sort(
                    function (a, b) {
                        return b.score - a.score;
                    }
                );
                for (const u of this.usersA) {
                    if (u.uid === id) {
                        this.foulen = u;
                        if (this.foulen.mailUser !== '') {
                            this.mail = true;
                        }
                        if (this.foulen.urlFacebook !== '') {
                            this.fb = true;
                        }
                        if (this.foulen.urlLinkedIn !== '') {
                            this.li = true;
                        }
                        this.rang = this.usersA.indexOf(u) + 1;
                        break;
                    }
                }

            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }

}
