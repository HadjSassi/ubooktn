import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../model/User';
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-all-profils',
    templateUrl: './all-profils.component.html',
    styleUrls: ['./all-profils.component.css']
})
export class AllProfilsComponent implements OnInit {
    loading = true;
    rang: User[] = [];
    currentPage = 1;
    nbMaxPage2 = 0;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 9; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    public Utilisateurs: User[] = []; // la liste de tous les documents d'aprés la base de donnée
    public Users: User[] = []; // la liste de tous les documents filtrés
    public utilisateur: User[] = []; // la liste des documents affiché d'aprés documentS
    public user: User[] = []; // la liste des documments affiché d'aprés document

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(
            (response: User[]) => {
                this.Utilisateurs = response;
                this.Utilisateurs = this.Utilisateurs.slice(0);
                this.Utilisateurs.sort(function (a, b) {
                        const x = b.score - a.score;
                        if (x === 0) {
                            if (a.nomUser + a.prenomUser > b.nomUser + b.prenomUser) {
                                return 1;
                            } else if (a.nomUser + a.prenomUser < b.nomUser + b.prenomUser) {
                                return -1;
                            } else {
                                return 0;
                            }
                        }
                        return b.score - a.score;
                    }
                );
                let i = 0;
                let maxx = 100;
                for (const x of this.Utilisateurs) {
                    this.Users.push(x);
                    maxx++;
                    if (maxx === 100) {
                        break;
                    }
                }
                this.rang = this.Users;
                i = 0;
                for (const e of this.Users) {
                    if (i === this.nbElmParPage) {
                        break;
                    }
                    this.utilisateur.push(e);
                    i++;
                }
                this.nbMaxPage = Math.ceil(this.Users.length / this.nbElmParPage);
                this.nbMaxPage2 = this.nbMaxPage * 10;
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: User[] = [];
        for (const doc of this.Utilisateurs) {
            if (doc.nomUser.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.prenomUser.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.job.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(doc);
            }
        }
        this.utilisateur = [];
        for (const doc of results) {
            this.utilisateur.push(doc);
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (results.length === 0 || !key) {
            this.Utilisateurs = [];
            this.utilisateur = [];
            this.Users = [];
            this.user = [];
            this.getUsers();
        }
    }


    onPageChange(currentPage: number) {
        {
            const results: User[] = [];
            let i = 0;
            for (const doc of this.Users) {
                if (i < this.nbElmParPage * (currentPage - 1)) {
                    i++;
                    continue;
                }
                results.push(doc);
                i++;
                if (i === (currentPage) * this.nbElmParPage) {
                    break;
                }
            }
            this.utilisateur = results;
        }
    }

    seeOneProfile(idUser: string) {
        this.router.navigate(['/profils', 'view', idUser]);
    }

}
