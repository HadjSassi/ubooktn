import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from './user.service';
import * as firebase from 'firebase';
import {AngularFireModule, FirebaseApp} from '@angular/fire';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private userService: UserService) {
    }


    createNewUser(email: string, pass: string, name: string) {
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().createUserWithEmailAndPassword(email, pass).then(
                    (test) => {
                        resolve();


                        const user: any = {
                            // @ts-ignore
                            uid: test.user.uid.toString(),
                            mailUser: email,
                            nomUser: name,
                            prenomUser: '',
                            urlPicUser: '../../../../assets/img/icon.png',
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

    getCurrentUser(): string {
        let mail = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    console.log(user);
                    mail = user.email;
                } else {
                    console.log('no user is connected!');
                    mail = null;
                }
            }
        );
        return mail;
    }


}
