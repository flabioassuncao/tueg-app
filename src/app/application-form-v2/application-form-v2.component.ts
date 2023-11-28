import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GiraService } from '../gira.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { ApplicationFormCompanionComponent } from '../application-form-companion/application-form-companion.component';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-application-form-v2',
  templateUrl: './application-form-v2.component.html',
  styleUrls: ['./application-form-v2.component.scss']
})
export class ApplicationFormV2Component implements OnInit {

  disableSaveButton = false;
  alertMessage = false;
  errors: string[] = [];

  giraId: string = '';
  gira = {name: '', startDate: '', endDate: '', acceptWatcher: false, acceptConsultation: false, acceptCleanse: false};

  companions: { name: string; receiveCleanse: boolean; spiritualConsultation: boolean }[] = [];

  applicationForm = this.formBuilder.group({
    giraId: '',
    name: '',
    phoneNumber: '',
    email: '',
    observation: '',
    typeOfService: '',
    receiveCleanse: false,
    spiritualConsultation: false,

    consentReceiveNews: false,
    consentTermsOfUseTermsOfServicePrivacyPolicy: false,
    
    companions: this.formBuilder.array([]),
  });

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute, 
    private giraService: GiraService,
    private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.giraId = routeParams.get('giraId')!;

    this.applicationForm.get('giraId')!.setValue(this.giraId);

    this.giraService.getGiraById(this.giraId!).subscribe({
      next: (val: any) => {
        if(val){
          this.gira = val;
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  openAddCompanion(){
    var dialogRef = this.dialog.open(ApplicationFormCompanionComponent, {
      data: this.gira,
      width: '50%',
      position: {left:'25%'} });

      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if(val.name !== undefined &&  val.typeOfService !== ""){
            this.companions.push({ name: val.name, receiveCleanse: val.typeOfService == 1 ? true : false, spiritualConsultation: val.typeOfService == 2 ? true : false});
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  addCompanion(companion?: any): void {
    const companionGroup = this.formBuilder.group({
      name: '',
      receiveCleanse: false,
      spiritualConsultation: false,
    });

    if (companion) {
      companionGroup.setValue(companion);
    }

    (this.applicationForm.get('companions') as FormArray).push(companionGroup);
  }

  onSubmit(): void {
    this.alertMessage = false
    this.errors = [];
    this.disableSaveButton = true;

    if(this.applicationForm.get('name')!.value == ''){
      this.errors.push('Informe o seu nome.');
    }

    if(this.applicationForm.get('email')!.value == ''){
      this.errors.push('Informe o seu email.');
    }

    if(this.applicationForm.get('typeOfService')!.value !== '1' &&
    this.applicationForm.get('typeOfService')!.value !== '2' &&
    this.applicationForm.get('typeOfService')!.value !== '3' ){
      this.errors.push('Informe o Tipo de Atendimento.');
    }

    if(this.applicationForm.get('consentTermsOfUseTermsOfServicePrivacyPolicy')!.value !== true){
      this.errors.push('Você precisa concordar com a Política de Privacidade, os Termos de Uso e os Termos de Serviço.');
    }

    if(this.applicationForm.get('consentReceiveNews')!.value !== true){
      this.applicationForm.get('consentReceiveNews')!.setValue(false);
    }

    if(this.errors.length > 0) {
      this.alertMessage = true;
      this.disableSaveButton = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
    else {

      if(this.companions.length > 0){
        this.companions.forEach((companion) => this.addCompanion(companion));
      }

      if(this.applicationForm.get('typeOfService')!.value == '1'){
        this.applicationForm.get('receiveCleanse')!.setValue(true);
        this.applicationForm.get('spiritualConsultation')!.setValue(false);
      } 
      if(this.applicationForm.get('typeOfService')!.value == '2'){
        this.applicationForm.get('spiritualConsultation')!.setValue(true);
        this.applicationForm.get('receiveCleanse')!.setValue(false);
      }
      if(this.applicationForm.get('typeOfService')!.value == '3'){
        this.applicationForm.get('receiveCleanse')!.setValue(false);
        this.applicationForm.get('spiritualConsultation')!.setValue(false);
      }

      this.giraService.createApplicationV2(this.applicationForm.value).subscribe({
        next: (val: any) => {
          this.companions = [];
          const companionsArray = this.applicationForm.get('companions') as FormArray;
          companionsArray.clear();
          this.applicationForm.reset();
          this.applicationForm.get('giraId')!.setValue(this.giraId);
          this.disableSaveButton = false;
          this.toastService.show('Inscrição realizado com sucesso. Verifique sua caixa de email.', { classname: 'bg-success text-light', delay: 15000 });
        },
        error: (err: any) => {
          console.error(err);

          if(err.status === 400){
            this.toastService.show(err.error.errors.Messages[0], { classname: 'bg-danger text-light', delay: 15000 });
          } else{
            this.toastService.show('Houve um erro na sua inscrição. Verifique os campos preenchidos.', { classname: 'bg-danger text-light', delay: 15000 });
          }

          const companionsArray = this.applicationForm.get('companions') as FormArray;
          companionsArray.clear();
          this.disableSaveButton = false;
        },
      });
    }
  }

  deteleCompanion(companion: any){
    const index = this.companions.indexOf(companion);
    
    if (index !== -1) {
      this.companions.splice(index, 1);
    }
  }

}
