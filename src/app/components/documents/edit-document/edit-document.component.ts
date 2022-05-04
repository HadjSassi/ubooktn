import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {DocumentService} from '../../../services/document.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {SettingsService} from '../../../services/settings.service';
import {Settings} from '../../../model/Settings';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {Document} from '../../../model/Document';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-edit-document',
    templateUrl: './edit-document.component.html',
    styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {
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
    doc: Document = null;
    id: number;

    constructor(private documentService: DocumentService,
                private router: Router,
                private route: ActivatedRoute,
                private userService: UserService,
                private settingService: SettingsService) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'] - 0;
        this.documentService.getDocumentById(this.id).subscribe(
            (result: Document) => {
                this.doc = result;
            }
        );
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
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    const mat = this.doc.settings.matiere;
                    const niv = this.doc.settings.niveau;
                    const ane = this.doc.settings.annee;
                    const settingg: any = {
                        'matiere': mat,
                        'niveau': niv,
                        'annee': ane
                    }
                    let urlll = '';
                    if (this.fileUrl.length !== 0) {
                        urlll = this.fileUrl;
                    } else {
                        urlll = this.doc.urlDocument;
                    }
                    this.settingService.getSettingsByData(ane, mat, niv).subscribe(
                        (setting: Settings) => {
                            if (setting === null) {
                                this.settingService.addSettings(settingg).subscribe(
                                    (response: Settings) => {
                                        setting = response;
                                        const document: Document = {
                                            idDocument: this.doc.idDocument,
                                            nomDocument: form.value['nomDocument'],
                                            typeDocument: form.value['typeDocument'],
                                            settings: setting,
                                            descriptionDocument: form.value['descriptionDocument'],
                                            documentAssoscie: form.value['associe'],
                                            veracity: this.doc.veracity,
                                            urlDocument: urlll,
                                            afficheDocument: this.doc.afficheDocument,
                                            uid: this.doc.uid,
                                            creative: this.doc.creative
                                        };
                                        // @ts-ignore
                                        this.documentService.updateDocument(document).subscribe(
                                            (responsee: Document) => {
                                                console.log(responsee);
                                                this.router.navigate(['documents']);
                                            }
                                        );
                                    }
                                )
                            } else {
                                const document: Document = {
                                    idDocument: this.doc.idDocument,
                                    nomDocument: form.value['nomDocument'],
                                    typeDocument: form.value['typeDocument'],
                                    settings: setting,
                                    descriptionDocument: form.value['descriptionDocument'],
                                    documentAssoscie: form.value['associe'],
                                    urlDocument: urlll,
                                    veracity: this.doc.veracity,
                                    afficheDocument: this.doc.afficheDocument,
                                    uid: this.doc.uid,
                                    creative: this.doc.creative
                                };
                                // @ts-ignore
                                this.updateUrl();
                                this.documentService.updateDocument(document).subscribe(
                                    (responsee: Document) => {
                                        console.log(responsee);
                                        this.router.navigate(['documents', 'view', this.doc.idDocument]);
                                    }
                                );
                            }
                        }
                    );
                }
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

    supprim() {
        const id = this.route.snapshot.params['id'];
        const txt = 'Are you sure to delete ' + this.doc.nomDocument;
        if (confirm(txt)) {
            this.userService.getUserByUid(this.doc.uid.uid).subscribe(
                (ree: User) => {
                    this.foulen = ree;
                    this.foulen.score -= 10;
                    this.userService.updateUser(this.foulen).subscribe(
                        (result: User) => {
                            this.documentService.deleteDocument(id).subscribe();
                            this.router.navigate(['documents']);
                        }
                    );
                }
            );
        }

    }

    updateUrl(): void {
        if (this.doc.urlDocument !== '') {
            this.documentService.resetUrl(this.doc.idDocument).subscribe();
        }
    }

}
