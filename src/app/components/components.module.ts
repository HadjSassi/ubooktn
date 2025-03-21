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
import {AboutComponent} from './about/about.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {BackgroundComponent} from './background/background.component';
import {DocumentsComponent} from './documents/documents.component';
import {EnivronnementUniversitaireComponent} from './enivronnement-universitaire/enivronnement-universitaire.component';
import {EventsComponent} from './events/events.component';
import {FaqComponent} from './faq/faq.component';
import {GuideComponent} from './guide/guide.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfilsComponent} from './profils/profils.component';
import {PubComponent} from '../shared/pub/pub.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent, NgbdModalContentForgetPwd} from './auth/sign-up/sign-up.component';
import {NewDocumentComponent, NgbdModalContentDocuments} from './documents/new-document/new-document.component';
import {OneDocumentComponent} from './documents/one-document/one-document.component';
import {ReglementComponent} from './documents/reglement/reglement.component';
import {ClubsComponent} from './enivronnement-universitaire/clubs/clubs.component';
import {InstitusComponent} from './enivronnement-universitaire/institus/institus.component';
import {OneClubComponent} from './enivronnement-universitaire/one-club/one-club.component';
import {OneInstitusComponent} from './enivronnement-universitaire/one-institus/one-institus.component';
import {CertificationsComponent} from './events/certifications/certifications.component';
import {CompetitionsComponent} from './events/competitions/competitions.component';
import {FormationsComponent} from './events/formations/formations.component';
import {AllProfilsComponent} from './profils/all-profils/all-profils.component';
import {OneProfilComponent} from './profils/one-profil/one-profil.component';
import {CentreFormationComponent} from './enivronnement-universitaire/centre-formation/centre-formation.component';
import {OneCentreFormationComponent} from './enivronnement-universitaire/one-centre-formation/one-centre-formation.component';
import {JourneyComponent} from './events/journey/journey.component';
import {OneEventComponent} from './events/one-event/one-event.component';
import {NewEventComponent} from './events/new-event/new-event.component';
import {NgbdModalContent} from './modal/modal.component';
import {NgbdModalContentEvents} from './events/new-event/new-event.component';
import {EditEventComponent} from './events/edit-event/edit-event.component';
import {ConfirmationComponent} from './not-found/confirmation/confirmation.component';
import {EditDocumentComponent} from './documents/edit-document/edit-document.component';
import {InscriptionComponent} from './events/inscription/inscription.component';
import {BookersComponent} from './events/bookers/bookers.component';
import {SelectRelatedComponent} from './documents/select-related/select-related.component';
import {ModalForgetComponent} from './auth/modal-forget/modal-forget.component';
import {ForgetComponent} from './auth/forget/forget.component';
import {WhiteExamsComponent} from './white-exams/white-exams.component';

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
        NewEventComponent,
        NgbdModalContentEvents,
        NgbdModalContentDocuments,
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContentForgetPwd,
        NgbdModalContent,
        AboutComponent,
        AcceuilComponent,
        BackgroundComponent,
        DocumentsComponent,
        EnivronnementUniversitaireComponent,
        EventsComponent,
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
        AllProfilsComponent,
        OneProfilComponent,
        CentreFormationComponent,
        OneCentreFormationComponent,
        JourneyComponent,
        OneEventComponent,
        EditEventComponent,
        ConfirmationComponent,
        EditDocumentComponent,
        InscriptionComponent,
        BookersComponent,
        SelectRelatedComponent,
        ModalForgetComponent,
        ForgetComponent,
        WhiteExamsComponent
    ],
    entryComponents: [NgbdModalContent, NgbdModalContentEvents],
    exports: [ComponentsComponent]
})
export class ComponentsModule {
}
