import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-modal-forget',
    templateUrl: './modal-forget.component.html',
    styleUrls: ['./modal-forget.component.css']
})
export class ModalForgetComponent implements OnInit {

    first = true;
    email = ';'

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        this.email = form.value['email'];
        firebase.auth().sendPasswordResetEmail(this.email).then(
            () => {
                console.log('Password Sent');
                this.first = false;
            }
        ).catch(error => {
            console.error(error);
        })
    }

}
