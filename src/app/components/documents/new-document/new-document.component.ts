import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../model/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';
import {NgForm} from '@angular/forms';
import {DocumentService} from '../../../services/document.service';
import {Settings} from '../../../model/Settings';
import * as firebase from 'firebase';

@Component({
    selector: 'app-new-document',
    templateUrl: './new-document.component.html',
    styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    matiere: string[] = [];
    niveau: string[] = [];
    annee: string[] = [];
    users: User[] = [];
    foulen: User;
    file: File = null; // Variable to store file


    constructor(private documentService: DocumentService,
                private router: Router,
                private userService: UserService,
                private settingService: SettingsService) {
    }

    ngOnInit(): void {
        this.settingService.getSettingsById(1).subscribe(
            (response: Settings) => {
                this.matiere = response.matiere.split(',');
                this.niveau = response.niveau.split(',');
                this.annee = response.annee.split(',');
                this.matiere.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                this.niveau.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                this.annee.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
            },
            error => {
                alert(error.message);
            }
        );
    }


    onSubmit(form: NgForm) {
        let uid = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                    console.log(this.fileUrl);
                    const document = {
                        nomDocument: form.value['nomDocument'],
                        typeDocument: form.value['typeDocument'],
                        matiereDocument: form.value['matiereDocument'],
                        niveauDocument: form.value['niveauDocument'],
                        anneeDocument: form.value['anneeDocument'],
                        descriptionDocument: form.value['descriptionDocument'],
                        corrigeDocument: form.value['corrige'],
                        documentAssoscie: form.value['associe'],
                        urlDocument: this.fileUrl,
                        afficheDocument: '',
                        uid: uid
                    };
                    // @ts-ignore
                    this.documentService.addDocument(document).subscribe(
                        // @ts-ignore
                        (response: Document) => {
                            console.log(response);
                            this.router.navigate(['documents']);

                            firebase.auth().onAuthStateChanged(
                                (users) => {
                                    if (users) {
                                        uid = users.uid.toString();
                                        this.searchUid(uid);
                                    } else {
                                        uid = 'dawa7';
                                        console.log('dawa7 ha mbarka');
                                    }
                                }
                            );
                        },
                        (error: HttpErrorResponse) => {
                            alert(error.message);
                        }
                    );


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
                this.foulen.score += 10;

                this.userService.updateUser(this.foulen).subscribe(
                    (responses: User) => {
                        console.log(responses);
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );


    }

    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.documentService.uploadFile(file).then(
            // @ts-ignore
            (url: string) => {
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
            }
        );
    }

    // @ts-ignore
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }


}
