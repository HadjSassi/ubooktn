import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import * as firebase from 'firebase';
import {User} from '../../../model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../services/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;

    ferm = false;
    valid = true;
    name = '';
    email = '';
    pass = '';
    repass = '';
    errorMessage = '';
    isInvalidMail = false;
    isInvalidPass = false;
    isInvalidConfirm = false;
    invName = false;
    look = false;

    constructor(private authService: AuthService,
                private router: Router,
                private userService: UserService,
                private afAuth: AngularFireAuth
    ) {
    }

    ngOnInit(): void {
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.router.navigate(['home']);
                }
            }
        );
    }

    OnClick() {
        this.router.navigate(['auth/signin']);
    }

    onSubmit(form: NgForm) {
        this.ferm = true;
        this.email = form.value['email'];
        this.pass = form.value['pass'];
        this.name = form.value['name'];
        this.authService.createNewUser(this.email, this.pass, this.name).then(
            () => {
                this.router.navigate(['/confirmation']);
            },
            (error) => {
                this.errorMessage = 'Veuillez Changer les cordonnée.';
            }
        );

    }

    ontype1(key: string) {
        this.pass = key;
        this.isInvalidConfirm = true;
        const test = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
        this.isInvalidPass = !(key.match(test));
    }

    ontype2(key: string) {
        this.isInvalidConfirm = (key !== this.pass || key.length < 6);
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

    verifMail(key: string) {
        if (key.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')) {
            this.isInvalidMail = false;
        } else {
            this.isInvalidMail = true;
        }
    }

    verifLegnth(ch: string) {
        ch = ch.replace(/\s/g, '');
        this.invName = ch.length <= 3;
    }

    gmail() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.signInWithPopup(googleAuthProvider).then(value => {
            // todo just call find user by uid; if none then notfound = true
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
