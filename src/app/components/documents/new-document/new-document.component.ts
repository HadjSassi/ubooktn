import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {User} from '../../../model/User';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';
import {NgForm} from '@angular/forms';
import {DocumentService} from '../../../services/document.service';
import {Settings} from '../../../model/Settings';
import * as firebase from 'firebase';
import {Document} from '../../../model/Document';

@Component({
    selector: 'app-new-document',
    templateUrl: './new-document.component.html',
    styleUrls: ['./new-document.component.scss']
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
    isValidLicense = true;
    licence = '';

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
                this.annee.reverse();
            }
        );
    }


    onSubmit(form: NgForm) {
        let uid = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    const mat = form.value['matiereDocument'];
                    const niv = form.value['niveauDocument'];
                    const ane = form.value['anneeDocument'];
                    const settingg: any = {
                        'matiere': mat,
                        'niveau': niv,
                        'annee': ane
                    }
                    this.settingService.getSettingsByData(ane, mat, niv).subscribe(
                        (setting: Settings) => {
                            if (setting === null) {
                                console.log('Creation of a new settings!');
                                this.settingService.addSettings(settingg).subscribe(
                                    (response: Settings) => {
                                        setting = response;
                                        this.userService.getUserByUid(user.uid).subscribe(
                                            (resolves: User) => {
                                                this.foulen = resolves;
                                                const document = {
                                                    nomDocument: form.value['nomDocument'],
                                                    typeDocument: form.value['typeDocument'],
                                                    settings: setting,
                                                    descriptionDocument: form.value['descriptionDocument'],
                                                    documentAssoscie: form.value['associe'],
                                                    urlDocument: this.fileUrl,
                                                    afficheDocument: '',
                                                    veracity: 'NotYet',
                                                    uid: this.foulen,
                                                    creative: this.licence
                                                };
                                                // @ts-ignore
                                                this.documentService.addDocument(document).subscribe(
                                                    // @ts-ignore
                                                    (responsee: Document) => {
                                                        console.log(responsee);
                                                        this.router.navigate(['documents']);
                                                        this.searchUid(this.foulen.uid);
                                                    }
                                                );
                                            }
                                        )

                                    }
                                )
                            } else {
                                this.userService.getUserByUid(user.uid).subscribe(
                                    (resolves: User) => {
                                        this.foulen = resolves;
                                        const document = {
                                            nomDocument: form.value['nomDocument'],
                                            typeDocument: form.value['typeDocument'],
                                            settings: setting,
                                            descriptionDocument: form.value['descriptionDocument'],
                                            documentAssoscie: form.value['associe'],
                                            urlDocument: this.fileUrl,
                                            veracity: 'NotYet',
                                            afficheDocument: '',
                                            uid: this.foulen,
                                            creative: this.licence
                                        };
                                        // @ts-ignore
                                        this.documentService.addDocument(document).subscribe(
                                            // @ts-ignore
                                            (responsee: Document) => {
                                                console.log(responsee);
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
                                            }
                                        );
                                    }
                                )
                            }
                        }
                    );
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
        this.documentService.uploadFile(file).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    console.log('file still');
                } else if (event instanceof HttpResponse) {
                    console.log('File success');
                    this.fileUrl = 'assets/Storage/Documents/' + file.name;
                    console.log(this.fileUrl)
                    this.fileIsUploading = false;
                    this.fileUploaded = true;
                }
            }
        );
    }

    // @ts-ignore
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }


    verifLicense(key: string) {
        // todo match the real format !
        const test = key.substr(0, 16)
        this.isValidLicense = test === '<a rel="license"' || key.length === 0;
        this.licence = key;
    }

}
