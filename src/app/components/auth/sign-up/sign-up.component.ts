import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/User';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-modal-content',
    template: `
        <style>
            .modal-content {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                pointer-events: auto;
                background-color: white;
                background-clip: padding-box;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 0.3rem;
                outline: 0;
            }
        </style>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center">Forgot Password</h5>
            </div>
            <div class="modal-body">
                <app-modal-forget></app-modal-forget>
            </div>
        </div>
    `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContentForgetPwd {
    closed = false;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal) {
    }

    bye() {
        this.closed = true;
        this.activeModal.close('Close click');
        this.passEntry.emit();
    }
}


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
    ready = true;
    pass = '';
    errorMessage = '';
    isError = false;
    look = false;

    constructor(private authService: AuthService,
                private router: Router,
                private modalService: NgbModal,
                private afAuth: AngularFireAuth,
                private userService: UserService
    ) {
    }

    ngOnInit(): void {
        // if it's connected then it will be redirected to the home page.
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.router.navigate(['acceuil']);
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
        console.log(this.email);
        console.log(this.pass);
        this.authService.signInUser(this.email, this.pass).then(
            () => {
                this.router.navigate(['acceuil']);
                window.location.reload();
            },
            (error) => {
                console.log(error);
                this.isError = true;
                this.errorMessage = 'Veuillez vérifier les cordonnée.';
            }
        );
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

    gmail() {
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.signInWithPopup(googleAuthProvider).then(value => {
            let notFound = true;
            this.userService.getUsers().subscribe(
                (result: User[]) => {
                    console.log(value.user.uid.toString());
                    for (const u of result) {
                        console.log(u.uid.toString());
                        if (u.uid.toString() === value.user.uid.toString()) {
                            notFound = false;
                            break;
                        }
                    }
                    if (notFound) {
                        const user: User = {
                            uid: value.user.uid.toString(),
                            mailUser: value.user.email,
                            nomUser: value.user.email.split('@')[0],
                            prenomUser: '',
                            urlPicUser: './assets/img/icon.png',
                            job: '',
                            urlFacebook: '',
                            urlLinkedIn: '',
                            score: 0,
                            description: '',
                            enabled: true
                        }
                        this.userService.addUser(user).subscribe(
                            (response: User) => {
                                console.log(user);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message);
                            }
                        );
                    }
                    this.router.navigate(['acceuil']);
                    window.location.reload();
                }, error => {
                    console.log(error);
                }
            );
        });
    }

    facebook() {
        const facebookAuthProvicer = new firebase.auth.FacebookAuthProvider();
        this.afAuth.signInWithPopup(facebookAuthProvicer).then(value => {
            let notFound = true;
            this.userService.getUsers().subscribe(
                (result: User[]) => {
                    console.log(value.user.uid.toString());
                    for (const u of result) {
                        console.log(u.uid.toString());
                        if (u.uid.toString() === value.user.uid.toString()) {
                            notFound = false;
                            break;
                        }
                    }
                    if (notFound) {
                        const user: User = {
                            uid: value.user.uid.toString(),
                            mailUser: value.user.email,
                            nomUser: value.user.email.split('@')[0],
                            prenomUser: '',
                            urlPicUser: './assets/img/icon.png',
                            job: '',
                            urlFacebook: '',
                            urlLinkedIn: '',
                            score: 0,
                            description: '',
                            enabled: true
                        }
                        this.userService.addUser(user).subscribe(
                            (response: User) => {
                                console.log(user);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message);
                            }
                        );
                    }
                    this.router.navigate(['acceuil']);
                    window.location.reload();
                }, error => {
                    console.log(error);
                }
            );
        });
    }

    modalOpen() {
        this.ready = false;
        const modalRef = this.modalService.open(NgbdModalContentForgetPwd);
        modalRef.componentInstance.passEntry.subscribe(() => {
            this.ready = true;
        })
    }
}
