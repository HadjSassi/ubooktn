import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {ExamenService} from '../../../services/examen.service';
import {Examen} from '../../../model/Examen';
import {User} from '../../../model/User';
import {Settings} from '../../../model/Settings';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';


@Component({
    selector: 'app-new-examen',
    templateUrl: './new-examen.component.html',
    styleUrls: ['./new-examen.component.css']
})
export class NewExamenComponent implements OnInit {

    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    matiere: string[] = [];
    niveau: string[] = [];
    annee: string[] = [];


    users: User[] = [];
    // @ts-ignore
    foulen: User;

    // @ts-ignore
    file: File = null; // Variable to store file

    constructor(private examenService: ExamenService,
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

                    const examen = {
                        nomExamen: form.value['nomExamen'],
                        typeExamen: form.value['typeExamen'],
                        matiereExamen: form.value['matiereExamen'],
                        niveauExamen: form.value['niveauExamen'],
                        anneeExamen: form.value['anneeExamen'],
                        corrigeExamen: form.value['corrige'],
                        examenAssocie: form.value['associe'],
                        descriptionExamen: form.value['descriptionExamen'],
                        urlExamen: this.fileUrl,
                        afficheExamen: '',
                        uid: uid
                    };
                    // @ts-ignore
                    this.examenService.addExamen(examen).subscribe(
                        (response: Examen) => {
                            console.log(response);
                            this.router.navigate(['exams']);

                            firebase.auth().onAuthStateChanged(
                                (users) => {
                                    if (users) {
                                        uid = user.uid.toString();
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
        /*this.examenService.uploadFile(file).then(
            // @ts-ignore
            (url: string) => {
                console.log('terminé!');
                console.log(url);
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
            }
        );*/
        this.examenService.uploadFile(file).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    console.log('file still');
                } else if (event instanceof HttpResponse) {
                    console.log('File success');
                    // this.fileUrl = environment.localStoragePath + 'Examen' + file.name;
                    this.fileUrl = 'assets/Storage/Examen/' + file.name;
                    console.log(this.fileUrl)
                    this.fileIsUploading = false;
                    this.fileUploaded = true;
                }
            }
        )
    }

    // @ts-ignore
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }
}
