import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';

import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ApplicationFormGirasComponent } from './application-form-giras/application-form-giras.component';
import { ApplicationFormV2Component } from './application-form-v2/application-form-v2.component';
import { ApplicationFormCompanionComponent } from './application-form-companion/application-form-companion.component';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { DatePipe } from '@angular/common';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ApplicationFormGirasComponent,
    ApplicationFormV2Component,
    ApplicationFormCompanionComponent,
    TermsOfServiceComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ApplicationFormGirasComponent },
      { path: 'terms-service', component: TermsOfServiceComponent },
      { path: 'terms-use', component: TermsOfUseComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'application/:giraId', component: ApplicationFormV2Component }
    ]),
    NgxMaskDirective, NgxMaskPipe,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    NgbModule,
    NgbTooltipModule,
    ToastsContainerComponent
  ],
  providers: [provideNgxMask(), DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
