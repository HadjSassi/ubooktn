import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
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
    isInvalidConfirm = false;
    invName = false;
    look = false;

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
        this.router.navigate(['auth/signin']);
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
        console.log('hey');
    }
}
