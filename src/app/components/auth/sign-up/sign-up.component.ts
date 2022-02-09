import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';

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
    constructor(private authService: AuthService,
                private router: Router,
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
        this.router.navigate(['auth/signin']);
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
            },
            (error) => {
                console.log(error);
                this.isError = true;
                this.errorMessage = 'Veuillez vérifier les cordonnée.';
            }
        );
    }


}
