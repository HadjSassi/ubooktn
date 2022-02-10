import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CommentDocumentService} from '../../../services/comment-document.service';
import {UserService} from '../../../services/user.service';
import {VoteDocumentService} from '../../../services/vote-document.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentService} from '../../../services/document.service';
import {VoteDocument} from '../../../model/VoteDocument';
import {HttpErrorResponse} from '@angular/common/http';
import {CommentDocument} from '../../../model/CommentDocument';
import {User} from '../../../model/User';
import {Document} from '../../../model/Document';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';


@Component({
    selector: 'app-one-document',
    templateUrl: './one-document.component.html',
    styleUrls: ['./one-document.component.css']
})
export class OneDocumentComponent implements OnInit {


    doc: any;
    // @ts-ignore
    url: SafeResourceUrl;
    isUrl = false;
    existe = false;
    liked = false;
    disliked = false;
    like = 0;
    dislike = 0;
    likes: VoteDocument[] = [];
    idUser = 0;
    voteInit: VoteDocument = {
        voteId: 0,
        documentId: 0,
        voteType: 0,
        userId: 0
    };
    // @ts-ignore
    user: User;
    activated = true;

    commentList: CommentDocument[] = [];
    comment: any = {
        documentId: 0,
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
                private documentService: DocumentService,
                public sanitizer: DomSanitizer,
                public voteService: VoteDocumentService,
                public userService: UserService,
                public commentService: CommentDocumentService) {
    }


    liker() {

        console.log(this.voteInit);
        console.log(this.idUser);

        if (this.liked) {
            this.liked = false;
            this.like--;
            const vote2: VoteDocument = this.voteInit;
            vote2.voteType = 0;
            this.voteService.updateVoteDocument(vote2).subscribe(
                (respon: VoteDocument) => {
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
                                    historiqueExamen: this.foulen2.historiqueExamen
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
            this.voteService.updateVoteDocument(vote2).subscribe(
                (respon: VoteDocument) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );

            this.documentService.getDocumentById(this.route.snapshot.params['id'] - 0).subscribe(
                (response: Document) => {
                    const uid3: string = response.uid;
                    this.userService.getUsers().subscribe(
                        (responsees: User[]) => {
                            for (const x of responsees) {
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
                                historiqueExamen: this.foulen2.historiqueExamen
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
                                        historiqueExamen: this.foulen2.historiqueExamen
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
            this.voteService.updateVoteDocument(vote2).subscribe(
                (respon: VoteDocument) => {
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
                                    historiqueExamen: this.foulen2.historiqueExamen
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
            this.voteService.updateVoteDocument(vote2).subscribe(
                (respon: VoteDocument) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
                }
            );
            this.documentService.getDocumentById(this.route.snapshot.params['id'] - 0).subscribe(
                (response: Document) => {
                    const uid3: string = response.uid;
                    this.userService.getUsers().subscribe(
                        (responses: User[]) => {
                            for (const x of responses) {
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
                                historiqueExamen: this.foulen2.historiqueExamen
                            }
                            this.userService.updateUser(newFoulen).subscribe(
                                (responsess: User) => {
                                    console.log(responsess);
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
                                        historiqueExamen: this.foulen2.historiqueExamen
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
            }
            this.interacted = true;
        }
    }

    commenter() {
        console.log(this.comment);
        this.commentService.addCommentDocument(this.comment).subscribe(
            (response: CommentDocument) => {
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
        const id: number = ids;
        // id document récupéré
        let uid = '';
        this.comment.documentId = id;
        this.commentService.getCommentDocuments().subscribe(
            (response: CommentDocument[]) => {
                for (const r of response) {
                    if (r.documentId.toString() === id.toString()) {
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
                                    this.idUser = i.idUser;
                                    this.comment.userUrl = i.urlPicUser;
                                    this.comment.userName = i.prenomUser + ' ' + i.nomUser;
                                    // iduser récupéré
                                    break;
                                }
                            }

                            // zone de travail iduser found
                            this.voteInit.documentId = id;
                            this.voteInit.userId = this.idUser;

                            this.voteService.getVoteDocuments().subscribe(
                                (responses: VoteDocument[]) => {
                                    for (const r of responses) {
                                        if (r.documentId === id) {
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
                                            documentId: this.voteInit.documentId,
                                            voteType: 0
                                        }
                                        this.voteService.addVoteDocument(vote3).subscribe(
                                            (responsess: VoteDocument) => {
                                                this.voteInit = responsess;
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


                            this.documentService.getDocumentById(id).subscribe(
                                (responses: Document) => {
                                    this.doc = responses;
                                    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc.urlDocument);
                                    if (this.doc.urlDocument !== '') {
                                        this.isUrl = true;
                                    }
                                },
                                (error: HttpErrorResponse) => {
                                    this.router.navigate(['/404NotFound']);
                                    console.log(error);
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
        this.documentService.getDocumentById(this.route.snapshot.params['id'] - 0).subscribe(
            (response: Document) => {
                const uid3: string = response.uid;
                this.userService.getUsers().subscribe(
                    (responses: User[]) => {
                        for (const x of responses) {
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
                            score: this.foulen2.score - 10,
                            description: this.foulen2.description,
                            historiqueDocument: this.foulen2.historiqueDocument,
                            historiqueExamen: this.foulen2.historiqueExamen,
                        };

                        // @ts-ignore
                        this.userService.updateUser(ins).subscribe(
                            (responsee: User) => {
                                this.router.navigate(['/acceuil']);
                                console.log(responsee);
                            },
                            (error: HttpErrorResponse) => {
                                alert(error.message)
                            }
                        );

                        // supprimer de la base de donnée
                        if (this.doc.urlDocument !== '') {
                            const storageRef = firebase.storage().refFromURL(this.doc.urlDocument);
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


                        this.documentService.deleteDocument(id).subscribe();

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
