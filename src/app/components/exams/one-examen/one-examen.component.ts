import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamenService} from '../../../services/examen.service';
import {Examen} from '../../../model/Examen';
import {CommentExamService} from '../../../services/comment-exam.service';
import {VoteExam} from '../../../model/VoteExam';
import {CommentExam} from '../../../model/CommentExam';
import {HttpErrorResponse} from '@angular/common/http';
import {VoteExamService} from '../../../services/vote-exam.service';
import {User} from '../../../model/User';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-one-examen',
    templateUrl: './one-examen.component.html',
    styleUrls: ['./one-examen.component.css']
})
export class OneExamenComponent implements OnInit {


    doc: any;
    // @ts-ignore
    url: SafeResourceUrl;
    isUrl = false;
    existe = false;
    liked = false;
    disliked = false;
    like = 0;
    dislike = 0;
    likes: VoteExam[] = [];
    idUser = 0;
    voteInit: VoteExam = {
        voteId: 0,
        examId: 0,
        voteType: 0,
        userId: 0
    };
    // @ts-ignore
    user: User;
    activated = true;


    commentList: CommentExam[] = [];
    comment: any = {
        examId: 0,
        userUrl: '',
        userName: '',
        comment: '',
        timing: new Date()
    };
    interacted = false;


    users: User[] = [];
    // @ts-ignore
    foulen: User;

    // @ts-ignore
    foulen2: User;
    // @ts-ignore
    uid2: string;
    public isAdmin = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private examenService: ExamenService,
                public sanitizer: DomSanitizer,
                public voteService: VoteExamService,
                public userService: UserService,
                public commentService: CommentExamService) {
    }

    liker() {

        console.log(this.voteInit);
        console.log(this.idUser);

        if (this.liked) {
            this.liked = false;
            this.like--;
            const vote2: VoteExam = this.voteInit;
            vote2.voteType = 0;
            this.voteService.updateVoteExam(vote2).subscribe(
                (respon: VoteExam) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );

            // attribution score pour le client
            firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        const uid = user.uid.toString();
                        this.userService.getUsers().subscribe(
                            (response: User[]) => {
                                for (const x of response) {
                                    if (x.uid === uid) {
                                        this.foulen2 = x;
                                        break;
                                    }
                                }

                                const newFoulen: User = {
                                    idUser: this.foulen2.idUser,
                                    uid: this.foulen2.uid,
                                    mailUser: this.foulen2.mailUser,
                                    nomUser: this.foulen2.nomUser,
                                    prenomUser: this.foulen2.prenomUser,
                                    urlPicUser: this.foulen2.urlPicUser,
                                    job: this.foulen2.job,
                                    urlFacebook: this.foulen2.urlFacebook,
                                    urlLinkedIn: this.foulen2.urlLinkedIn,
                                    score: this.foulen2.score - 1,
                                    description: this.foulen2.description,
                                    historiqueDocument: this.foulen2.historiqueDocument,
                                    historiqueExamen: this.foulen2.historiqueExamen,
                                    isEnabled: this.foulen2.isEnabled
                                }
                                this.userService.updateUser(newFoulen).subscribe(
                                    (responses: User) => {
                                        console.log(responses);
                                    },
                                    (error: HttpErrorResponse) => {
                                        alert(error.message)
                                    }
                                );
                            }
                        );
                    } else {
                        console.log('dawa7 ha mbarka');
                    }
                }
            );
            this.interacted = false;
        } else {
            this.liked = true;
            this.like++;
            if (this.disliked) {
                this.disliked = false;
                this.dislike--;
            }
            const vote2 = this.voteInit;
            vote2.voteType = 1;
            this.voteService.updateVoteExam(vote2).subscribe(
                (respon: VoteExam) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );

            this.examenService.getExamenById(this.route.snapshot.params['id'] - 0).subscribe(
                (response: Examen) => {
                    const uid3: string = response.uid;
                    this.userService.getUsers().subscribe(
                        (responsee: User[]) => {
                            for (const x of responsee) {
                                if (x.uid === uid3) {
                                    this.foulen2 = x;
                                    break;
                                }
                            }

                            const newFoulen: User = {
                                idUser: this.foulen2.idUser,
                                uid: this.foulen2.uid,
                                mailUser: this.foulen2.mailUser,
                                nomUser: this.foulen2.nomUser,
                                prenomUser: this.foulen2.prenomUser,
                                urlPicUser: this.foulen2.urlPicUser,
                                job: this.foulen2.job,
                                urlFacebook: this.foulen2.urlFacebook,
                                urlLinkedIn: this.foulen2.urlLinkedIn,
                                score: this.foulen2.score + 3,
                                description: this.foulen2.description,
                                historiqueDocument: this.foulen2.historiqueDocument,
                                historiqueExamen: this.foulen2.historiqueExamen,
                                isEnabled: this.foulen2.isEnabled
                            }
                            this.userService.updateUser(newFoulen).subscribe(
                                (responses: User) => {
                                    console.log(responses);
                                },
                                (error: HttpErrorResponse) => {
                                    alert(error.message)
                                }
                            );
                        }
                    );
                }
            );

            // attribution score pour le client
            if (!this.interacted) {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            const uid = user.uid.toString();
                            this.userService.getUsers().subscribe(
                                (response: User[]) => {
                                    for (const x of response) {
                                        if (x.uid === uid) {
                                            this.foulen2 = x;
                                            break;
                                        }
                                    }

                                    const newFoulen: User = {
                                        idUser: this.foulen2.idUser,
                                        uid: this.foulen2.uid,
                                        mailUser: this.foulen2.mailUser,
                                        nomUser: this.foulen2.nomUser,
                                        prenomUser: this.foulen2.prenomUser,
                                        urlPicUser: this.foulen2.urlPicUser,
                                        job: this.foulen2.job,
                                        urlFacebook: this.foulen2.urlFacebook,
                                        urlLinkedIn: this.foulen2.urlLinkedIn,
                                        score: this.foulen2.score + 1,
                                        description: this.foulen2.description,
                                        historiqueDocument: this.foulen2.historiqueDocument,
                                        historiqueExamen: this.foulen2.historiqueExamen,
                                        isEnabled: this.foulen2.isEnabled
                                    }
                                    this.userService.updateUser(newFoulen).subscribe(
                                        (responsee: User) => {
                                            console.log(responsee);
                                        },
                                        (error: HttpErrorResponse) => {
                                            alert(error.message)
                                        }
                                    );
                                }
                            );
                        } else {
                            console.log('dawa7 ha mbarka');
                        }
                    }
                );
            }
            this.interacted = true;
        }
    }

    disliker() {
        if (this.disliked) {
            this.disliked = false;
            this.dislike--;
            const vote2 = this.voteInit;
            vote2.voteType = 0;
            this.voteService.updateVoteExam(vote2).subscribe(
                (respon: VoteExam) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );

            // attribution score pour le client
            firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        const uid = user.uid.toString();
                        this.userService.getUsers().subscribe(
                            (response: User[]) => {
                                for (const x of response) {
                                    if (x.uid === uid) {
                                        this.foulen2 = x;
                                        break;
                                    }
                                }

                                const newFoulen: User = {
                                    idUser: this.foulen2.idUser,
                                    uid: this.foulen2.uid,
                                    mailUser: this.foulen2.mailUser,
                                    nomUser: this.foulen2.nomUser,
                                    prenomUser: this.foulen2.prenomUser,
                                    urlPicUser: this.foulen2.urlPicUser,
                                    job: this.foulen2.job,
                                    urlFacebook: this.foulen2.urlFacebook,
                                    urlLinkedIn: this.foulen2.urlLinkedIn,
                                    score: this.foulen2.score - 1,
                                    description: this.foulen2.description,
                                    historiqueDocument: this.foulen2.historiqueDocument,
                                    historiqueExamen: this.foulen2.historiqueExamen,
                                    isEnabled: this.foulen2.isEnabled
                                }
                                this.userService.updateUser(newFoulen).subscribe(
                                    (responses: User) => {
                                        console.log(responses);
                                    },
                                    (error: HttpErrorResponse) => {
                                        alert(error.message)
                                    }
                                );
                            }
                        );
                        this.interacted = false;
                    } else {
                        console.log('dawa7 ha mbarka');
                    }
                }
            );
        } else {
            this.disliked = true;
            this.dislike++;
            if (this.liked) {
                this.liked = false;
                this.like--;
            }
            const vote2 = this.voteInit;
            vote2.voteType = -1;
            this.voteService.updateVoteExam(vote2).subscribe(
                (respon: VoteExam) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );
            this.examenService.getExamenById(this.route.snapshot.params['id'] - 0).subscribe(
                (response: Examen) => {
                    const uid3: string = response.uid;
                    this.userService.getUsers().subscribe(
                        (responsee: User[]) => {
                            for (const x of responsee) {
                                if (x.uid === uid3) {
                                    this.foulen2 = x;
                                    break;
                                }
                            }

                            const newFoulen: User = {
                                idUser: this.foulen2.idUser,
                                uid: this.foulen2.uid,
                                mailUser: this.foulen2.mailUser,
                                nomUser: this.foulen2.nomUser,
                                prenomUser: this.foulen2.prenomUser,
                                urlPicUser: this.foulen2.urlPicUser,
                                job: this.foulen2.job,
                                urlFacebook: this.foulen2.urlFacebook,
                                urlLinkedIn: this.foulen2.urlLinkedIn,
                                score: this.foulen2.score - 3,
                                description: this.foulen2.description,
                                historiqueDocument: this.foulen2.historiqueDocument,
                                historiqueExamen: this.foulen2.historiqueExamen,
                                isEnabled: this.foulen2.isEnabled
                            }
                            this.userService.updateUser(newFoulen).subscribe(
                                (responses: User) => {
                                    console.log(responses);
                                },
                                (error: HttpErrorResponse) => {
                                    alert(error.message)
                                }
                            );
                        }
                    );
                }
            );
            // attribution score pour le client
            if (!this.interacted) {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            const uid = user.uid.toString();
                            this.userService.getUsers().subscribe(
                                (response: User[]) => {
                                    for (const x of response) {
                                        if (x.uid === uid) {
                                            this.foulen2 = x;
                                            break;
                                        }
                                    }

                                    const newFoulen: User = {
                                        idUser: this.foulen2.idUser,
                                        uid: this.foulen2.uid,
                                        mailUser: this.foulen2.mailUser,
                                        nomUser: this.foulen2.nomUser,
                                        prenomUser: this.foulen2.prenomUser,
                                        urlPicUser: this.foulen2.urlPicUser,
                                        job: this.foulen2.job,
                                        urlFacebook: this.foulen2.urlFacebook,
                                        urlLinkedIn: this.foulen2.urlLinkedIn,
                                        score: this.foulen2.score + 1,
                                        description: this.foulen2.description,
                                        historiqueDocument: this.foulen2.historiqueDocument,
                                        historiqueExamen: this.foulen2.historiqueExamen,
                                        isEnabled: this.foulen2.isEnabled
                                    }
                                    this.userService.updateUser(newFoulen).subscribe(
                                        (responsee: User) => {
                                            console.log(responsee);
                                        },
                                        (error: HttpErrorResponse) => {
                                            alert(error.message)
                                        }
                                    );
                                }
                            );
                        } else {
                            console.log('dawa7 ha mbarka');
                        }
                    }
                );
            }
            this.interacted = true;
        }
    }

    commenter() {
        console.log(this.comment);
        this.commentService.addCommentExam(this.comment).subscribe(
            (response: CommentExam) => {
                console.log(response);
                this.commentList.push(response);
                this.activated = false;
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
            },
            error => {
                alert(error.message)
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
                this.foulen.score += 2;

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


    ngOnInit(): void {

        let uids = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uids = user.uid.toString();
                    this.userService.getUsers().subscribe(
                        (response: User[]) => {
                            for (const i of response) {
                                if (i.uid === uids) {
                                    this.foulen2 = i;
                                    if (this.foulen2.mailUser === environment.admine) {
                                        this.isAdmin = true
                                    }
                                    break;
                                }
                            }
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
        const ids: number = this.route.snapshot.params['id'];
        const id: number = ids - 0;
        // id exam récupéré
        let uid = '';
        this.comment.examId = id;
        this.commentService.getCommentExams().subscribe(
            (response: CommentExam[]) => {
                for (const r of response) {
                    if (r.examId.toString() === id.toString()) {
                        this.commentList.push(r);
                    }
                }
                this.commentList.reverse();
                this.commentList = this.commentList.slice(0, 10);
            },
            error => {
                alert(error.message);
            }
        );

        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                    // uid récupéré
                    this.userService.getUsers().subscribe(
                        (response: User[]) => {
                            for (const i of response) {
                                if (i.uid === uid) {
                                    this.idUser = i.idUser - 0;
                                    this.comment.userUrl = i.urlPicUser;
                                    this.comment.userName = i.prenomUser + ' ' + i.nomUser;
                                    // iduser récupéré
                                    break;
                                }
                            }

                            // zone de travail iduser found
                            this.voteInit.examId = id - 0;
                            this.voteInit.userId = this.idUser;

                            this.voteService.getVoteExams().subscribe(
                                (responses: VoteExam[]) => {
                                    for (const r of responses) {
                                        if (r.examId === id) {
                                            this.likes.push(r);
                                        }
                                    }
                                    for (const r of this.likes) {
                                        if (r.voteType === 1) {
                                            this.like++;
                                        } else if (r.voteType === -1) {
                                            this.dislike++;
                                        }
                                    }
                                    for (const r of this.likes) {
                                        if (r.userId === this.idUser) {
                                            this.voteInit = r;
                                            break;
                                        }
                                    }
                                    if (this.voteInit.voteType === 1) {
                                        this.liked = true;
                                    } else if (this.voteInit.voteType === -1) {
                                        this.disliked = true;
                                    }
                                    for (const r of this.likes) {
                                        if (r.userId === this.idUser) {
                                            this.existe = true;
                                            break;
                                        }
                                    }
                                    if (!this.existe) {
                                        const vote3: any = {
                                            userId: this.voteInit.userId,
                                            examId: this.voteInit.examId,
                                            voteType: 0
                                        }
                                        this.voteService.addVoteExam(vote3).subscribe(
                                            (responsee: VoteExam) => {
                                                this.voteInit = responsee;
                                            },
                                            (error: HttpErrorResponse) => {
                                                alert(error.message);
                                            }
                                        );
                                    }
                                },
                                error => {
                                    alert(error.message);
                                }
                            );


                            this.examenService.getExamenById(id).subscribe(
                                (responses: Examen) => {
                                    this.doc = responses;
                                    this.uid2 = this.doc.uid;
                                    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc.urlExamen);
                                    if (this.doc.urlExamen !== '') {
                                        this.isUrl = true;
                                    }
                                },
                                (error: HttpErrorResponse) => {
                                    console.log(error);
                                    this.router.navigate(['/404NotFound']);
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

    del() {
        this.examenService.getExamenById(this.route.snapshot.params['id'] - 0).subscribe(
            (response: Examen) => {
                const uid3: string = response.uid;
                this.userService.getUsers().subscribe(
                    (responsee: User[]) => {
                        for (const x of responsee) {
                            if (x.uid === uid3) {
                                this.foulen2 = x;
                                break;
                            }
                        }

                        const id: number = this.route.snapshot.params['id'] - 0;
                        // punir l'utilsateur
                        const ins = {
                            idUser: this.foulen2.idUser,
                            uid: this.foulen2.uid,
                            mailUser: this.foulen2.mailUser,
                            nomUser: this.foulen2.nomUser,
                            prenomUser: this.foulen2.prenomUser,
                            urlPicUser: this.foulen2.urlPicUser,
                            job: this.foulen2.job,
                            urlFacebook: this.foulen2.urlFacebook,
                            urlLinkedIn: this.foulen2.urlLinkedIn,
                            score: this.foulen2.score - 20,
                            description: this.foulen2.description,
                            historiqueDocument: this.foulen2.historiqueDocument,
                            historiqueExamen: this.foulen2.historiqueExamen,
                        };
                        // @ts-ignore
                        this.userService.updateUser(ins).subscribe(
                            (responses: User) => {
                                console.log(responses);
                                this.router.navigate(['/acceuil']);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message)
                            }
                        );

                        // supprimer de la base de donnée
                        if (this.doc.urlExamen !== '') {
                            const storageRef = firebase.storage().refFromURL(this.doc.urlExamen);
                            storageRef.delete().then(
                                () => {
                                    console.log('document ancien supprimé!');
                                }
                            ).catch(
                                (error) => {
                                    console.log('Fichier non trouvée :' + error);
                                }
                            );
                        }

                        this.examenService.deleteExamen(id).subscribe();

                    },
                    error => {
                        console.log(error);
                    }
                );
            },
            error => {
                console.log(error);
            }
        );
    }


}
