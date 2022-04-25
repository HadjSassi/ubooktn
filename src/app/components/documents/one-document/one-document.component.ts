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
// todo the creator of this document could change some data or delete this document you should do it later okay !

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
    voteInit = {
        voteId: 0,
        document: null,
        voteType: 0,
        user: null
    };
    // @ts-ignore
    user: User;
    activated = true;
    idOfDocument = 0;
    commentList: CommentDocument[] = [];
    comment = {
        idComment: 0,
        comment: '',
        document: null,
        user: null,
        timing: new Date()
    };
    interacted = false;
    isPdf = false;
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
            // attribution score pour le client
            this.interacted = true;
        }
    }

    disliker() {
        if (this.disliked) {
            this.disliked = false;
            this.dislike--;
            const vote2 = this.voteInit;
            this.interacted = false;
            vote2.voteType = 0;
            this.voteService.updateVoteDocument(vote2).subscribe(
                (respon: VoteDocument) => {
                    console.log(respon);
                },
                error => {
                    alert(error.message);
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

        this.userService.getUserByUid(uid).subscribe(
            (response: User) => {
                this.foulen = response;
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
                    this.userService.getUserByUid(uids).subscribe(
                        (response: User) => {
                            this.foulen2 = response;
                        }
                    );
                }
            }
        );
        const id: number = this.route.snapshot.params['id'] - 0;
        this.idOfDocument = id;
        // id document récupéré
        let uid = '';
        this.comment.document = {idDocument: id};
        this.voteInit.document = {idDocument: id};

        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                    // uid récupéré
                    this.userService.getUserByUid(uid).subscribe(
                        (response: User) => {
                            this.comment.user = response;
                            this.voteInit.user = response;
                            this.documentService.getDocumentById(id).subscribe(
                                (responses: Document) => {
                                    this.doc = responses;
                                    const lic = document.getElementById('licence');
                                    if (this.doc.creative.length !== 0) {
                                        lic.innerHTML = this.doc.creative;
                                    }
                                    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc.urlDocument);
                                    if (this.doc.urlDocument !== '') {
                                        this.isUrl = true;
                                        const chh = this.doc.urlDocument.substr(-4, 4);
                                        if (chh === '.pdf') {
                                            this.isPdf = true;
                                        }
                                    }
                                    console.log(responses);
                                    // comments of that document !
                                    this.commentService.getCommentDocumentsByDocument(responses.idDocument).subscribe(
                                        (resultatComment: CommentDocument[]) => {
                                            this.commentList = resultatComment;
                                            this.commentList.reverse();
                                            this.commentList = this.commentList.slice(0, 10);
                                            console.log(resultatComment);
                                        }
                                    );
                                    // votes of that document !
                                    this.voteService.getVoteDocumentsByDocument(responses.idDocument).subscribe(
                                        (resultatVote: VoteDocument[]) => {
                                            console.log(resultatVote);
                                            this.likes = resultatVote;
                                            for (const r of this.likes) {
                                                if (r.user.uid === uid) {
                                                    this.voteInit = r;
                                                    this.existe = true;
                                                }
                                                if (r.voteType === 1) {
                                                    this.like++;
                                                } else if (r.voteType === -1) {
                                                    this.dislike++;
                                                }
                                            }
                                            if (this.voteInit.voteType === 1) {
                                                this.liked = true;
                                            } else if (this.voteInit.voteType === -1) {
                                                this.disliked = true;
                                            }
                                            if (!this.existe) {
                                                const vote3: any = {
                                                    user: response,
                                                    document: {idDocument: id},
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
                                        }
                                    );
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
        this.documentService.getDocumentById(this.idOfDocument).subscribe(
            (response: Document) => {
                this.userService.getUserByUid(response.uid.uid).subscribe(
                    (responses: User) => {
                        this.foulen2 = responses;
                        // punir l'utilsateur
                        const ins: User = {
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
                            enabled: this.foulen2.enabled
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

                        // todo supprimer de la base de donnée
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


                        this.documentService.deleteDocument(this.idOfDocument).subscribe();

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
