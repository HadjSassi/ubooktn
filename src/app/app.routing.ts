import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {DocumentsComponent} from './components/documents/documents.component';
import {OneDocumentComponent} from './components/documents/one-document/one-document.component';
import {ReglementComponent} from './components/documents/reglement/reglement.component';
import {NewDocumentComponent} from './components/documents/new-document/new-document.component';
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
import {AuthGuard} from './services/auth.guard';
import {CentreFormationComponent} from './components/enivronnement-universitaire/centre-formation/centre-formation.component';
import {OneCentreFormationComponent} from './components/enivronnement-universitaire/one-centre-formation/one-centre-formation.component';
import {JourneyComponent} from './components/events/journey/journey.component';
import {OneEventComponent} from './components/events/one-event/one-event.component';
import {NewEventComponent} from './components/events/new-event/new-event.component';
import {EditEventComponent} from './components/events/edit-event/edit-event.component';
import {ConfirmationComponent} from './components/not-found/confirmation/confirmation.component';
import {EditDocumentComponent} from './components/documents/edit-document/edit-document.component';
import {InscriptionComponent} from './components/events/inscription/inscription.component';
import {BookersComponent} from './components/events/bookers/bookers.component';
import {ForgetComponent} from './components/auth/forget/forget.component';
import {WhiteExamsComponent} from './components/white-exams/white-exams.component';


const routes: Routes = [
    {path: '', redirectTo: 'acceuil', pathMatch: 'full'},
    {path: 'acceuil', component: AcceuilComponent},
    {path: 'auth/signin', component: SignUpComponent},
    {path: 'auth/signup', component: SignInComponent},
    {path: 'guide', component: GuideComponent},
    {path: 'FAQ', component: FaqComponent},
    {path: 'aboutUs', component: AboutComponent},
    {path: 'forgot', component: ForgetComponent},
    {path: 'university', component: EnivronnementUniversitaireComponent},
    {path: 'university/Institus', component: InstitusComponent},
    {path: 'university/Institus/:id', component: OneInstitusComponent},
    {path: 'university/Clubs', component: ClubsComponent},
    {path: 'university/Clubs/:id', component: OneClubComponent},
    {path: 'university/TrainingCenter', component: CentreFormationComponent},
    {path: 'university/TrainingCenter/:id', component: OneCentreFormationComponent},
    {path: 'event', component: EventsComponent},
    {path: 'event/new', canActivate: [AuthGuard], component: NewEventComponent},
    {path: 'event/edit/:type/:id', canActivate: [AuthGuard], component: EditEventComponent},
    {path: 'event/competitions', component: CompetitionsComponent},
    {path: 'event/training', component: FormationsComponent},
    {path: 'event/certifications', component: CertificationsComponent},
    {path: 'event/:id', component: OneEventComponent},
    {path: 'event/:id/BooKers', component: BookersComponent},
    {path: 'eventInscription/:id', component: InscriptionComponent},
    {path: 'event/journey', component: JourneyComponent},
    {path: 'whiteExams', component: WhiteExamsComponent},
    {path: 'documents', component: DocumentsComponent},
    {path: 'documents/new', canActivate: [AuthGuard], component: NewDocumentComponent},
    {path: 'documents/edit/:id', canActivate: [AuthGuard], component: EditDocumentComponent},
    {path: 'documents/reglementions', canActivate: [AuthGuard], component: ReglementComponent},
    {path: 'documents/view/:id', canActivate: [AuthGuard], component: OneDocumentComponent},
    {path: 'profils', canActivate: [AuthGuard], component: ProfilsComponent},
    {path: 'profils/all', component: AllProfilsComponent},
    {path: 'profils/view/:id', canActivate: [AuthGuard], component: OneProfilComponent},
    {path: '404NotFound', component: NotFoundComponent},
    {path: 'confirmation', component: ConfirmationComponent},
    {path: '**', redirectTo: '/404NotFound'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
