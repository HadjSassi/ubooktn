import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {ComponentsModule} from './components/components.module';
import {ExamplesModule} from './examples/examples.module';
import {PubComponent} from './components/pub/pub.component';
import {DocumentsComponent} from './components/documents/documents.component';
import {OneDocumentComponent} from './components/documents/one-document/one-document.component';
import {ReglementComponent} from './components/documents/reglement/reglement.component';
import {NewDocumentComponent} from './components/documents/new-document/new-document.component';
import {ExamsComponent} from './components/exams/exams.component';
import {OneExamenComponent} from './components/exams/one-examen/one-examen.component';
import {NewExamenComponent} from './components/exams/new-examen/new-examen.component';
import {ReglementExamenComponent} from './components/exams/reglement-examen/reglement-examen.component';
import {BackgroundComponent} from './components/background/background.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ProfilsComponent} from './components/profils/profils.component';
import {OneProfilComponent} from './components/profils/one-profil/one-profil.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {ClubsComponent} from './components/enivronnement-universitaire/clubs/clubs.component';
import {InstitusComponent} from './components/enivronnement-universitaire/institus/institus.component';
import {AcceuilComponent} from './components/acceuil/acceuil.component';
import {OneInstitusComponent} from './components/enivronnement-universitaire/one-institus/one-institus.component';
import {OneClubComponent} from './components/enivronnement-universitaire/one-club/one-club.component';
import {AllProfilsComponent} from './components/profils/all-profils/all-profils.component';
import {CompetitionsComponent} from './components/events/competitions/competitions.component';
import {CertificationsComponent} from './components/events/certifications/certifications.component';
import {FormationsComponent} from './components/events/formations/formations.component';
import {EventsComponent} from './components/events/events.component';
import {GuideComponent} from './components/guide/guide.component';
import {FaqComponent} from './components/faq/faq.component';
import {AboutComponent} from './components/about/about.component';
import {EnivronnementUniversitaireComponent} from './components/enivronnement-universitaire/enivronnement-universitaire.component'
import {HttpClientModule} from '@angular/common/http';
import {InstitusService} from './services/institus.service';
import {CommentExamService} from './services/comment-exam.service';
import {ClubService} from './services/club.service';
import {CommentDocumentService} from './services/comment-document.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {VoteDocumentService} from './services/vote-document.service';
import {ExamenService} from './services/examen.service';
import {VoteExamService} from './services/vote-exam.service';
import {AuthGuard} from './services/auth.guard';
import {DocumentService} from './services/document.service';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire'

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        // PubComponent,
        // DocumentsComponent,
        // OneDocumentComponent,
        // ReglementComponent,
        // NewDocumentComponent,
        // ExamsComponent,
        // OneExamenComponent,
        // NewExamenComponent,
        // ReglementExamenComponent,
        // BackgroundComponent,
        // NotFoundComponent,
        // EnivronnementUniversitaireComponent,
        // ProfilsComponent,
        // OneProfilComponent,
        // SignInComponent,
        // SignUpComponent,
        // ClubsComponent,
        // InstitusComponent,
        // AcceuilComponent,
        // OneInstitusComponent,
        // OneClubComponent,
        // AllProfilsComponent,
        // CompetitionsComponent,
        // CertificationsComponent,
        // FormationsComponent,
        // EventsComponent,
        // GuideComponent,
        // FaqComponent,
        // AboutComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        ExamplesModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),

    ],
    providers: [
        AuthGuard,
        AuthService,
        DocumentService,
        UserService,
        CommentDocumentService,
        CommentExamService,
        ExamenService,
        VoteDocumentService,
        VoteExamService,
        InstitusService,
        ClubService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
