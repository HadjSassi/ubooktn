import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';

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

    constructor(private authService: AuthService,
                private router: Router
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
        this.router.navigate(['auth/signup']);
    }

    onSubmit(form: NgForm) {
        this.ferm = true;
        this.email = form.value['email'];
        this.pass = form.value['pass'];
        this.name = form.value['name'];
        this.authService.createNewUser(this.email, this.pass, this.name).then(
            () => {
                this.router.navigate(['acceuil']);
            },
            (error) => {
                this.errorMessage = 'Veuillez Changer les cordonnée.';
            }
        );

    }

    ontype1(key: string) {
        this.pass = key;
        this.isInvalidPass = key.length < 6;
    }

}
