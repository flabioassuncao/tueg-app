import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-application-form-companion',
  templateUrl: './application-form-companion.component.html',
  styleUrls: ['./application-form-companion.component.scss']
})
export class ApplicationFormCompanionComponent {

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ApplicationFormCompanionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){ }

  companionForm = this.formBuilder.group({
    name: '',
    typeOfService: ''
  });

  onSubmit(){
    this.dialogRef.close(this.companionForm.value);
  }
}
