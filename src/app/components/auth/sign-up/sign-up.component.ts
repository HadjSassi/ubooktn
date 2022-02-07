import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {NgForm} from '@angular/forms';

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

    constructor(private authService: AuthService,
                private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    OnClick() {
        this.router.navigate(['auth/signin']);
    }

    onSubmit(form: NgForm) {
        this.ferm = true;
        this.email = form.value['email'];
        this.pass = form.value['pass'];
        this.authService.signInUser(this.email, this.pass).then(
            () => {
                this.router.navigate(['acceuil']);
            },
            (error) => {
                console.log(error);
                this.errorMessage = 'Veuillez vérifier les cordonnée.';
            }
        );
    }


}
