import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;
    ferm = false;
    valid = true;
    email = '';
    pass = '';
    errorMessage = '';
    isError = false;
    look = false;

    constructor(private authService: AuthService,
                private router: Router,
                private afAuth: AngularFireAuth,
                private userService: UserService
    ) {
    }

    ngOnInit(): void {
        // if it's connected then it will be redirected to the home page.
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.router.navigate(['home']);
                }
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
        console.log(this.email);
        console.log(this.pass);
        this.authService.signInUser(this.email, this.pass).then(
            () => {
                this.router.navigate(['home']);
                window.location.reload();
            },
            (error) => {
                console.log(error);
                this.isError = true;
                this.errorMessage = 'Veuillez vérifier les cordonnée.';
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
                    this.router.navigate(['home']);
                    window.location.reload();
                }, error => {
                    console.log(error);
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
                    this.router.navigate(['home']);
                    window.location.reload();
                }, error => {
                    console.log(error);
                }
            );
        });
    }

}
