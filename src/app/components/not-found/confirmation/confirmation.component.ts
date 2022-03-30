import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

    users: User;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit(): void {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.userService.getUserByUid(user.uid).subscribe(
                    (result: User) => {
                        this.users = result;
                        if (result['enabled'] === true) {
                            this.router.navigate(['acceuil']);
                        }
                    }
                )
            }
        );
    }
}
