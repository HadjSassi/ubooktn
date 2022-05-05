import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
                <h5 class="modal-title text-center">Reset & Select the related Documents</h5>
            </div>
            <div class="modal-body">
                <app-select-related></app-select-related>
            </div>
            <div class="modal-footer">
                <div class="left-side">
                    <button type="button" class="btn btn-danger btn-link" (click)="activeModal.close('Close click')">Cancel</button>
                </div>
                <div class="divider"></div>
                <div class="right-side">
                    <button type="button" class="btn btn-default btn-link" (click)="bye()">Accept</button>
                </div>
            </div>
        </div>
    `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContentDocuments {
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
    ready = true;
    cfing = [];

    constructor(private documentService: DocumentService,
                private router: Router,
                private userService: UserService,
                private modalService: NgbModal,
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
        if (this.ready) {
            let cfss = '';
            if (this.cfing.length !== 0) {
                for (const x of this.cfing) {
                    cfss += x.idDocument + ',';
                }
                cfss = cfss.substring(0, (cfss.length - 1));
            }
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
                                                        documentAssoscie: cfss,
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
                                                documentAssoscie: cfss,
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
    }

    verifLicense(key: string) {
        // todo match the real format !
        const test = key.substr(0, 16)
        this.isValidLicense = test === '<a rel="license"' || key.length === 0;
        this.licence = key;
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

    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }

    open() {
        this.ready = false;
        this.settingService.resetOrganisms();
        const modalRef = this.modalService.open(NgbdModalContentDocuments);
        modalRef.componentInstance.passEntry.subscribe(() => {
            this.updateDocument();
            this.ready = true;
        })
    }

    closeCf(c: any) {
        console.log(c);
        this.cfing.splice(this.cfing.indexOf(c), 1);
    }

    updateDocument() {
        this.cfing = this.settingService.getDocumenting();
    }

}
