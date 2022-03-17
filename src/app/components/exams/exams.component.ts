import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../model/Settings';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {Examen} from '../../model/Examen';
import {ExamenService} from '../../services/examen.service';

@Component({
    selector: 'app-exams',
    templateUrl: './exams.component.html',
    styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    public examens: Examen[] = []; // la liste de tous les documents d'aprés la base de donnée
    public exams: Examen[] = []; // la liste de tous les documents filtrés
    public exx: Examen[] = []; // la liste des documents affiché d'aprés documentS
    public ex: Examen[] = []; // la liste des documments affiché d'aprés document
    public isnext = false;
    public isprevious = false;
    matiere: string[] = [];
    niveau: string[] = [];
    annee: string[] = [];
    nbMaxPage2 = 0;
    loading = true;
    constructor(private examenService: ExamenService,
                private router: Router,
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
        this.getExamen();
    }

    onViewExamen(id: number) {
        this.router.navigate(['/exams', 'view', id]);
    }

    onNewExamen() {
        this.router.navigate(['/exams', 'reglementions']);
    }

    public getExamen(): void {
        this.examens = [];
        this.exams = [];
        this.exx = [];
        this.ex = [];
        this.examenService.getExamens().subscribe(
            (response: Examen[]) => {
                this.examens = response;
                this.examens.sort(
                    function (a, b) {
                        if (a.idExamen < b.idExamen) {
                            return 1;
                        } else if (a.idExamen > b.idExamen) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                let i = 0;
                for (const e of response) {
                    if (i === this.nbElmParPage) {
                        break;
                    }
                    this.exx.push(e);
                    i++;
                }
                this.nbMaxPage = Math.ceil(response.length / this.nbElmParPage);
                this.nbMaxPage2 = this.nbMaxPage * 10;
                if (this.nbMaxPage > 1) {
                    this.isnext = true;
                }
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: Examen[] = [];
        for (const doc of this.examens) {
            if (doc.nomExamen.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.typeExamen.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.matiereExamen.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.niveauExamen.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(doc);
            }
        }
        this.exx = [];
        for (const doc of results) {
            this.exx.push(doc);
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;
        if (results.length === 0 || !key) {
            this.getExamen();
        }
    }

    onSubmit(form: NgForm) {
        if ('' === form.value['page']) {
            this.nbElmParPage = 5;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        const typeExamen = form.value['typeExamen'];
        const matiereExamen = form.value['matiereExamen'];
        const niveauExamen = form.value['niveauExamen'];
        const anneeExamen = form.value['anneeExamen'];

        // console.log("/"+this.nbElmParPage +"/"+typeExamen+"/"+matiereExamen+"/"+niveauExamen+"/"+anneeExamen+"/")
        let i = this.nbPage;
        let results: Examen[] = [];
        for (const doc of this.examens) {
            if (
                doc.niveauExamen.toString().toLowerCase().indexOf(niveauExamen.toLowerCase()) !== -1
                && doc.typeExamen.toString().toLowerCase().indexOf(typeExamen.toLowerCase()) !== -1
                && doc.matiereExamen.toString().toLowerCase().indexOf(matiereExamen.toLowerCase()) !== -1
                && doc.anneeExamen.toString().toLowerCase().indexOf(anneeExamen.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;
        console.log(this.nbMaxPage + ' = ' + results.length + '/' + this.nbElmParPage);
        this.exams = results;
        results = [];
        for (const doc of this.exams) {
            results.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.ex = results;
        if (results.length === 0) {
            this.getExamen();
        }
    }

    onPageChange(currentPage: number) {
        if (this.exams.length === 0) {
            const results: Examen[] = [];
            let i = 0;
            for (const doc of this.examens) {
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
            this.exx = results;
        } else {
            const results: Examen[] = [];
            let i = 0;
            for (const doc of this.exams) {
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
            this.ex = results;
        }
    }
}
