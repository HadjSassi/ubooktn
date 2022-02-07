import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';

import {BasicelementsComponent} from './basicelements/basicelements.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TypographyComponent} from './typography/typography.component';
import {NucleoiconsComponent} from './nucleoicons/nucleoicons.component';
import {ComponentsComponent} from './components.component';
import {NotificationComponent} from './notification/notification.component';
import {NgbdModalComponent} from './modal/modal.component';
import {NgbdModalContent} from './modal/modal.component';
import {AboutComponent} from './about/about.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {BackgroundComponent} from './background/background.component';
import {DocumentsComponent} from './documents/documents.component';
import {EnivronnementUniversitaireComponent} from './enivronnement-universitaire/enivronnement-universitaire.component';
import {EventsComponent} from './events/events.component';
import {ExamsComponent} from './exams/exams.component';
import {FaqComponent} from './faq/faq.component';
import {GuideComponent} from './guide/guide.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfilsComponent} from './profils/profils.component';
import {PubComponent} from './pub/pub.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';
import {NewDocumentComponent} from './documents/new-document/new-document.component';
import {OneDocumentComponent} from './documents/one-document/one-document.component';
import {ReglementComponent} from './documents/reglement/reglement.component';
import {ClubsComponent} from './enivronnement-universitaire/clubs/clubs.component';
import {InstitusComponent} from './enivronnement-universitaire/institus/institus.component';
import {OneClubComponent} from './enivronnement-universitaire/one-club/one-club.component';
import {OneInstitusComponent} from './enivronnement-universitaire/one-institus/one-institus.component';
import {CertificationsComponent} from './events/certifications/certifications.component';
import {CompetitionsComponent} from './events/competitions/competitions.component';
import {FormationsComponent} from './events/formations/formations.component';
import {NewExamenComponent} from './exams/new-examen/new-examen.component';
import {OneExamenComponent} from './exams/one-examen/one-examen.component';
import {ReglementExamenComponent} from './exams/reglement-examen/reglement-examen.component';
import {AllProfilsComponent} from './profils/all-profils/all-profils.component';
import {OneProfilComponent} from './profils/one-profil/one-profil.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContent,
        AboutComponent,
        AcceuilComponent,
        BackgroundComponent,
        DocumentsComponent,
        EnivronnementUniversitaireComponent,
        EventsComponent,
        ExamsComponent,
        FaqComponent,
        GuideComponent,
        NotFoundComponent,
        ProfilsComponent,
        PubComponent,
        SignInComponent,
        SignUpComponent,
        NewDocumentComponent,
        OneDocumentComponent,
        ReglementComponent,
        ClubsComponent,
        InstitusComponent,
        OneClubComponent,
        OneInstitusComponent,
        CertificationsComponent,
        CompetitionsComponent,
        FormationsComponent,
        NewExamenComponent,
        OneExamenComponent,
        ReglementExamenComponent,
        AllProfilsComponent,
        OneProfilComponent
    ],
    entryComponents: [NgbdModalContent],
    exports: [ComponentsComponent]
})
export class ComponentsModule {
}
