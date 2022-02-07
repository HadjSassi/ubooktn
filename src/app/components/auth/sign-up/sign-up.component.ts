import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    test: Date = new Date();
    focus;
    focus1;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
    }

    OnClick() {
        this.router.navigate(['auth/signin']);
    }
}
