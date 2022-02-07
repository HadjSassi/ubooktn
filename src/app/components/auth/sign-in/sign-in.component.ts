import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    OnClick() {
        this.router.navigate(['auth/signup']);
    }

}
