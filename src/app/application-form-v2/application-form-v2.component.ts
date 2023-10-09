import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GiraService } from '../gira.service';
import { FormBuilder } from '@angular/forms';
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

  gira = {name: '', startDate: '', endDate: ''};

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

    consentStoredData: false,
    consentTermsConditions: false,
    companions: this.formBuilder.array([{
      name: '',
      receiveCleanse: false,
      spiritualConsultation: false
    }])
  });

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute, 
    private giraService: GiraService,
    private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const giraId = routeParams.get('giraId');

    this.applicationForm.get('giraId')!.setValue(giraId);

    this.giraService.getGiraNameById(giraId!).subscribe({
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
      width: '50%',
      position: {left:'25%'} });

      dialogRef.afterClosed().subscribe({
        next: (val: any) => {
          if(val.name !== undefined && ( val.receiveCleanse !== false || val.spiritualConsultation !== false)){
            this.companions.push({ name: val.name, receiveCleanse: val.typeOfService == 1 ? true : false, spiritualConsultation: val.typeOfService == 2 ? true : false});
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }

  onSubmit(): void {
    this.alertMessage = false
    this.errors = [];
    this.disableSaveButton = true;

    if(this.companions.length > 0){
      this.applicationForm.get('companions')!.setValue(this.companions);
    }

    if(this.applicationForm.get('name')!.value == ''){
      this.errors.push('Informe o seu nome.');
    }

    if(this.applicationForm.get('email')!.value == ''){
      this.errors.push('Informe o seu email.');
    }

    if(this.applicationForm.get('typeOfService')!.value !== '1' &&
    this.applicationForm.get('typeOfService')!.value !== '2' ){
      this.errors.push('Informe o Tipo de Atendimento.');
    }

    if(this.applicationForm.get('consentStoredData')!.value !== true){
      this.errors.push('Permissão para guardar dados pessoais é necessario.');
    }

    if(this.applicationForm.get('consentTermsConditions')!.value !== true &&
    this.applicationForm.get('typeOfService')!.value !== '2' ){
      this.errors.push('Concorde com os termos econdições.');
    }

    if(this.errors.length > 0){
      this.alertMessage = true;
      this.disableSaveButton = false;
    } else {
      if(this.applicationForm.get('typeOfService')!.value == '1'){
        this.applicationForm.get('receiveCleanse')!.setValue(true);
      } else {
        this.applicationForm.get('spiritualConsultation')!.setValue(true);
      }
  
      this.giraService.createApplicationV2(this.applicationForm.value).subscribe({
        next: (val: any) => {
          this.companions = [];
          this.applicationForm.reset();
          this.disableSaveButton = false;
          this.toastService.show('Incrição realizado com sucesso. Verifique sua caixa de email.', { classname: 'bg-success text-light', delay: 15000 });
        },
        error: (err: any) => {
          console.error(err);
          this.disableSaveButton = false;
          this.toastService.show('Houve um erro na sua inscrição. Verifique os campos preenchidos.', { classname: 'bg-danger text-light', delay: 15000 });
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
