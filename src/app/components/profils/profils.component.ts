import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
    selector: 'app-profils',
    templateUrl: './profils.component.html',
    styleUrls: ['./profils.component.css']
})
export class ProfilsComponent implements OnInit {
    users: User[] = [];
    usersA: User[] = [];
    foulen: User;
    rang = 0;
    file: File = null; // Variable to store file
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    message = '';

    constructor(private router: Router,
                private authService: AuthService,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.init();
    }


    init(): void {
        let uid = '';

        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                    this.searchUid(uid);
                } else {
                    uid = 'dawa7';
                    console.log('dawa7 ha mbarka');
                }
            }
        );
    }


    searchUid(uid: string) {

        this.userService.getUsers().subscribe(
            (response: User[]) => {
                this.users = response;
                for (const i of this.users) {
                    if (i.uid === uid) {
                        this.foulen = i;
                        break;
                    }
                }
                this.usersA = this.users.slice(0);
                this.usersA.sort(
                    function (a, b) {
                        return b.score - a.score;
                    }
                );
                for (const u of this.usersA) {
                    if (u.uid === this.foulen.uid) {
                        this.rang = this.usersA.indexOf(u) + 1;
                        break;
                    }
                }
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }


    onSubmit(form: NgForm) {

        this.fileUploaded = true;
        this.message = 'Mise à jour terminé';

        let nom = form.value['nom'];
        if (nom === '') {
            nom = this.foulen.nomUser;
        }

        let prenom = form.value['prenom'];
        if (prenom === '') {
            prenom = this.foulen.prenomUser;
        }

        let job = form.value['job'];
        if (job === '') {
            job = this.foulen.job;
        }

        let mail = form.value['mail'];
        if (mail === '') {
            mail = this.foulen.mailUser;
        }

        let facebook = form.value['facebook'];
        if (facebook === '') {
            facebook = this.foulen.urlFacebook;
        }

        let linkedin = form.value['linkedin'];
        if (linkedin === '') {
            linkedin = this.foulen.urlLinkedIn;
        }

        let description = form.value['description'];
        if (description === '') {
            description = this.foulen.description;
        }

        if (this.fileUrl === '') {
            this.fileUrl = this.foulen.urlPicUser;
        }

        const rajel: User = {
            uid: this.foulen.uid,
            mailUser: mail,
            nomUser: nom,
            prenomUser: prenom,
            urlPicUser: this.fileUrl,
            job: job,
            urlFacebook: facebook,
            urlLinkedIn: linkedin,
            score: this.foulen.score,
            description: description,
            enabled: true
        }
        this.updatePic();
        this.userService.updateUser(rajel).subscribe(
            (response: User) => {
                console.log(response);
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
                console.log(error.message);
            }
        );
    }


    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.userService.uploadFile(file).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    this.fileIsUploading = true;
                    console.log('file still');
                } else if (event instanceof HttpResponse) {
                    console.log('File success');
                    this.fileUrl = 'assets/Storage/PicUser/' + file.name;
                    console.log(this.fileUrl)
                    this.fileIsUploading = false;
                    this.fileUploaded = true;
                    this.message = 'Picture Updated! Click on Apply Changes!';
                }
            }
        );
        this.userService.resetUrlPic(this.foulen.uid).subscribe();
    }

    // @ts-ignore
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }

    test(): void {
        window.location.reload();
    }

    updatePic(): void {
        if (this.foulen.urlPicUser !== '../../../../assets/img/icon.png') {
            this.userService.resetUrlPic(this.foulen.uid).subscribe();
        }
    }

}
