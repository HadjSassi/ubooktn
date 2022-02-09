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
                let uid = '';
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            uid = user.uid.toString();
                            this.userService.getUsers().subscribe(
                                (responses: User[]) => {
                                    for (const i of responses) {
                                        if (i.uid === uid) {
                                            this.foulen2 = i;
                                            if (this.foulen2.mailUser === environment.admine) {
                                                this.isAdmin = true
                                            }
                                            break;
                                        }
                                    }
                                },
                                (error: HttpErrorResponse) => {
                                    alert(error.message);
                                }
                            );
                        } else {
                            uid = 'dawa7';
                            console.log('dawa7 ha mbarka');
                        }
                    }
                );
                this.users = response;
                this.usersA = this.users.slice(0);
                this.usersA.sort(
                    function (a, b) {
                        return b.score - a.score;
                    }
                );
                for (const u of this.usersA) {
                    if (u.idUser.toString() === id.toString()) {
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

    admine(form: NgForm) {
        const scores = form.value['scores'];

        const ins = {
            idUser: this.foulen.idUser,
            uid: this.foulen.uid,
            mailUser: this.foulen.mailUser,
            nomUser: this.foulen.nomUser,
            prenomUser: this.foulen.prenomUser,
            urlPicUser: this.foulen.urlPicUser,
            job: this.foulen.job,
            urlFacebook: this.foulen.urlFacebook,
            urlLinkedIn: this.foulen.urlLinkedIn,
            score: scores,
            description: this.foulen.description,
            historiqueDocument: this.foulen.historiqueDocument,
            historiqueExamen: this.foulen.historiqueExamen,
        };

        // @ts-ignore
        this.userService.updateUser(ins).subscribe(
            (response: User) => {
                this.router.navigate(['/acceuil']);
            },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        );


    }
}
