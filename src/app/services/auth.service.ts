import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {User} from '../model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private userService: UserService) {
    }


    createNewUser(email: string, pass: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, pass).then(
                    (test) => {
                        resolve();


                        const user: any = {
                            // @ts-ignore
                            uid: test.user.uid.toString(),
                            mailUser: email,
                            nomUser: '',
                            prenomUser: '',
                            urlPicUser: 'assets/img/icon.png',
                            job: '',
                            urlFacebook: '',
                            urlLinkedIn: '',
                            score: 0,
                            description: '',
                            historiqueDocument: '',
                            historiqueExamen: '',
                        }
                        this.userService.addUser(user).subscribe(
                            (response: User) => {
                                console.log(response);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message);
                                console.log(error.message);
                            }
                        );


                    },
                    (error: any) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(email: string, pass: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email, pass).then(
                    () => {
                        resolve();
                    },
                    (error: any) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signOutUser() {
        firebase.auth().signOut();
    }


}
