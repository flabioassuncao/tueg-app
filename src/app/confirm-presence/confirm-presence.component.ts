import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiraService } from '../gira.service';
import { Application } from '../models/ApplicationModel';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-confirm-presence',
  templateUrl: './confirm-presence.component.html',
  styleUrls: ['./confirm-presence.component.scss']
})
export class ConfirmPresenceComponent implements OnInit {

  disableCancelButton = false;
  giraAvailable: boolean = true;
  application: Application | undefined;
  applicationId: string = '';

  constructor(
    private giraService: GiraService,
    private route: ActivatedRoute,
    private toastService: ToastService) { }


  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.applicationId = routeParams.get('applicationId')!;

    this.giraService.getApplicationById(this.applicationId!).subscribe({
      next: (val: any) => {
        if(val){
          this.application = val;
          if(new Date() > new Date(val.startDate)){
            this.giraAvailable = false;
          }
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  cancelApplication(applicationId: string){
    this.disableCancelButton = true;

    this.giraService.cancelApplication(applicationId).subscribe({
      next: (val: any) => {
        this.disableCancelButton = false;
        this.toastService.show('Pedido de cancelamento realizado com sucesso. Verifique sua caixa de email.', { classname: 'bg-success text-light', delay: 10000 });
      },
      error: (err: any) => {
        console.error(err);
        this.disableCancelButton = false;
        this.toastService.show('Houve um erro ao cancelar sua inscrição. Tente novamente mais tarde.', { classname: 'bg-danger text-light', delay: 15000 });
      },
    });
  }
}
