import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {ComponentsComponent} from './components/components.component';
import {ProfileComponent} from './examples/profile/profile.component';
import {SignupComponent} from './examples/signup/signup.component';
import {LandingComponent} from './examples/landing/landing.component';
import {NucleoiconsComponent} from './components/nucleoicons/nucleoicons.component';

import {PubComponent} from './shared/pub/pub.component';
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
import {AuthGuard} from './services/auth.guard';
import {CentreFormationComponent} from './components/enivronnement-universitaire/centre-formation/centre-formation.component';
import {OneCentreFormationComponent} from './components/enivronnement-universitaire/one-centre-formation/one-centre-formation.component';
import {JourneyComponent} from './components/events/journey/journey.component';
import {OneCompetitionComponent} from './components/events/one-competition/one-competition.component';
import {OneFormationComponent} from './components/events/one-formation/one-formation.component';
import {OneCertificationComponent} from './components/events/one-certification/one-certification.component';
import {OneJourneyComponent} from './components/events/one-journey/one-journey.component';
import {NewEventComponent} from './components/events/new-event/new-event.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: ComponentsComponent},
    {path: 'user-profile', component: ProfileComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'nucleoicons', component: NucleoiconsComponent},
    {path: 'acceuil', component: AcceuilComponent},
    {path: 'auth/signup', component: SignUpComponent},
    {path: 'auth/signin', component: SignInComponent},
    {path: 'guide', component: GuideComponent},
    {path: 'FAQ', component: FaqComponent},
    {path: 'aboutUs', component: AboutComponent},
    {path: 'university', component: EnivronnementUniversitaireComponent},
    {path: 'university/Institus', component: InstitusComponent},
    {path: 'university/Institus/:id', component: OneInstitusComponent},
    {path: 'university/Clubs', component: ClubsComponent},
    {path: 'university/Clubs/:id', component: OneClubComponent},
    {path: 'university/TrainingCenter', component: CentreFormationComponent},
    {path: 'university/TrainingCenter/:id', component: OneCentreFormationComponent},
    {path: 'event', component: EventsComponent},
    {path: 'event/new', canActivate: [AuthGuard], component: NewEventComponent},
    {path: 'event/competitions', component: CompetitionsComponent},
    {path: 'event/competitions/:id', component: OneCompetitionComponent},
    {path: 'event/training', component: FormationsComponent},
    {path: 'event/training/:id', component: OneFormationComponent},
    {path: 'event/certifications', component: CertificationsComponent},
    {path: 'event/certifications/:id', component: OneCertificationComponent},
    {path: 'event/journey', component: JourneyComponent},
    {path: 'event/journey/:id', component: OneJourneyComponent},
    {path: 'documents', component: DocumentsComponent},
    {path: 'documents/new', canActivate: [AuthGuard], component: NewDocumentComponent},
    {path: 'documents/reglementions', canActivate: [AuthGuard], component: ReglementComponent},
    {path: 'documents/view/:id', canActivate: [AuthGuard], component: OneDocumentComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'exams/new', canActivate: [AuthGuard], component: NewExamenComponent},
    {path: 'exams/reglementions', canActivate: [AuthGuard], component: ReglementExamenComponent},
    {path: 'exams/view/:id', canActivate: [AuthGuard], component: OneExamenComponent},
    {path: 'profils', canActivate: [AuthGuard], component: ProfilsComponent},
    {path: 'profils/all', component: AllProfilsComponent},
    {path: 'profils/view/:id', canActivate: [AuthGuard], component: OneProfilComponent},
    {path: '404NotFound', component: NotFoundComponent},
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
