import {Component, OnInit} from '@angular/core';
import {Event} from '../../../model/Event';
import {User} from '../../../model/User';
import {EventService} from '../../../services/event.service';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    test: Date = new Date();
    focus;
    focus1;
    ferm = false;
    valid = true;
    thanks = false;
    email = '';
    pass = '';
    errorMessage = '';
    isError = false;
    look = false;
    id: number;
    event: Event = null;
    foulen: User = null;

    constructor(
        private eventService: EventService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        private afAuth: AngularFireAuth
    ) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.eventService.getEventById(this.id).subscribe(
            (result: Event) => {
                this.event = result;
            }
        );
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.userService.getUserByUid(user.uid).subscribe(
                        (result: User) => {
                            this.foulen = result;
                        }
                    );
                }
            }
        );
    }

    reservation(): void {
        let text = '';
        const valeur = 'UID:' + this.foulen.uid + ',Name:' + this.foulen.nomUser + ',Prename:' +
            this.foulen.prenomUser + ',Email:' + this.foulen.mailUser;
        if (this.event.participants.length === 0) {
            text = '{' + valeur + '}'
        } else {
            text = ',{' + valeur + '}'
        }
        this.event.participants += text;
        this.eventService.updateEvent(this.event).subscribe(
            (resulet: Event) => {
                this.thanks = true;
                // todo thanks message
            }
        );
    }

    OnClick() {
        this.router.navigate(['auth/signup']);
    }

    onSubmit(form: NgForm) {
        this.ferm = true;
        this.email = form.value['email'];
        this.pass = form.value['pass'];
        this.authService.signInUser(this.email, this.pass).then(
            () => {
                this.reservation()
            },
            (error) => {
                this.isError = true;
                this.errorMessage = 'Veuillez vérifier les cordonnées.';
            }
        );
    }

    looks() {
        const x = document.getElementById('pass');
        if (this.look) {
            this.look = false;
            x.type = 'password';
        } else {
            this.look = true;
            x.type = 'text';
        }
    }

    gmail() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.signInWithPopup(googleAuthProvider).then(value => {
            let notFound = true;
            this.userService.getUsers().subscribe(
                (result: User[]) => {
                    for (const u of result) {
                        if (u.uid.toString() === value.user.uid.toString()) {
                            notFound = false;
                            break;
                        }
                    }
                    if (notFound) {
                        const user: User = {
                            uid: value.user.uid.toString(),
                            mailUser: value.user.email,
                            nomUser: value.user.email.split('@')[0],
                            prenomUser: '',
                            urlPicUser: './assets/img/icon.png',
                            job: '',
                            urlFacebook: '',
                            urlLinkedIn: '',
                            score: 0,
                            description: '',
                            enabled: true
                        }
                        this.userService.addUser(user).subscribe(
                            (response: User) => {
                                console.log(user);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message);
                            }
                        );
                    }
                    this.reservation()
                }
            );
        });
    }

    facebook() {
        const facebookAuthProvicer = new firebase.auth.FacebookAuthProvider();
        this.afAuth.signInWithPopup(facebookAuthProvicer).then(value => {
            let notFound = true;
            this.userService.getUsers().subscribe(
                (result: User[]) => {
                    console.log(value.user.uid.toString());
                    for (const u of result) {
                        console.log(u.uid.toString());
                        if (u.uid.toString() === value.user.uid.toString()) {
                            notFound = false;
                            break;
                        }
                    }
                    if (notFound) {
                        const user: User = {
                            uid: value.user.uid.toString(),
                            mailUser: value.user.email,
                            nomUser: value.user.email.split('@')[0],
                            prenomUser: '',
                            urlPicUser: './assets/img/icon.png',
                            job: '',
                            urlFacebook: '',
                            urlLinkedIn: '',
                            score: 0,
                            description: '',
                            enabled: true
                        }
                        this.userService.addUser(user).subscribe(
                            (response: User) => {
                                console.log(user);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message);
                            }
                        );
                    }
                    this.reservation()
                }
            );
        });
    }

}
