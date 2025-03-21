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
import {HttpClientModule} from '@angular/common/http';
import {InstitusService} from './services/institus.service';
import {ClubService} from './services/club.service';
import {CommentDocumentService} from './services/comment-document.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {VoteDocumentService} from './services/vote-document.service';
import {AuthGuard} from './services/auth.guard';
import {DocumentService} from './services/document.service';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire'
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {CentreFormationService} from './services/centre-formation.service';
import {EventService} from './services/event.service';
import {NouisliderModule} from 'ng2-nouislider';

firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireStorageModule,
        NouisliderModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        DocumentService,
        AngularFireAuth,
        UserService,
        EventService,
        CentreFormationService,
        CommentDocumentService,
        VoteDocumentService,
        InstitusService,
        ClubService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
