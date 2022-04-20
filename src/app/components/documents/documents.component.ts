import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DocumentService} from '../../services/document.service';
import {Settings} from '../../model/Settings';
import {Document} from '../../model/Document';


@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

    loading = true;
    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    public documents: Document[] = []; // la liste de tous les documents d'aprés la base de donnée
    public document: Document[] = []; // la liste de tous les documents filtrés
    public docume: Document[] = []; // la liste des documents affiché d'aprés documentS
    public docu: Document[] = []; // la liste des documments affiché d'aprés document
    public isnext = false;
    public isprevious = false;
    matiere: string[] = [];
    niveau: string[] = [];
    annee: string[] = [];
    nbMaxPage2 = 0;
    grille = true;

    constructor(private documentService: DocumentService,
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
        this.getDocument();
    }

    onViewDocument(id: number) {
        this.router.navigate(['/documents', 'view', id]);
    }

    public getDocument(): void {
        this.documentService.getDocuments().subscribe(
            (response: Document[]) => {
                this.documents = response;
                this.documents.sort(
                    function (a, b) {
                        if (a.idDocument < b.idDocument) {
                            return 1;
                        } else if (a.idDocument > b.idDocument) {
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
                    this.docume.push(e);
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
        const results: Document[] = [];
        for (const doc of this.documents) {
            if (doc.nomDocument.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.typeDocument.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.settings.matiere.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.settings.niveau.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(doc);
            }
        }
        this.docume = [];
        for (const doc of results) {
            this.docume.push(doc);
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (results.length === 0 || !key) {
            this.documents = [];
            this.document = [];
            this.docume = [];
            this.docu = [];
            this.getDocument();
        }
    }

    onSubmit(form: NgForm) {
        if ('' === form.value['page']) {
            this.nbElmParPage = 5;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        const typeDocument = form.value['typeDocument'];
        const matiereDocument = form.value['matiereDocument'];
        const niveauDocument = form.value['niveauDocument'];
        const anneeDocument = form.value['anneeDocument'];

        let i = this.nbPage;
        let results: Document[] = [];
        for (const doc of this.documents) {
            if (
                doc.settings.niveau.toString().toLowerCase().indexOf(niveauDocument.toLowerCase()) !== -1
                && doc.typeDocument.toString().toLowerCase().indexOf(typeDocument.toLowerCase()) !== -1
                && doc.settings.matiere.toString().toLowerCase().indexOf(matiereDocument.toLowerCase()) !== -1
                && doc.settings.annee.toString().toLowerCase().indexOf(anneeDocument.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        console.log(this.nbMaxPage + ' = ' + results.length + '/' + this.nbElmParPage);
        this.document = results;
        results = [];
        for (const doc of this.document) {
            results.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.docu = results;
        if (results.length === 0) {
            this.documents = [];
            this.document = [];
            this.docume = [];
            this.docu = [];
            this.getDocument();
        }
    }

    onPageChange(currentPage: number) {
        if (this.document.length === 0) {
            const results: Document[] = [];
            let i = 0;
            for (const doc of this.documents) {
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
            this.docume = results;
        } else {
            const results: Document[] = [];
            let i = 0;
            for (const doc of this.document) {
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
            this.docu = results;
        }
    }

    onGrille() {
        this.grille = !this.grille;
    }
}
