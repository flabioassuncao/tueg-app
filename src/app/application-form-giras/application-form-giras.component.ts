import { Component, OnInit } from '@angular/core';
import { GiraService } from '../gira.service';
import { Gira, GiraPagination } from '../models/GiraModel';
import { ToastService } from '../toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-application-form-giras',
  templateUrl: './application-form-giras.component.html',
  styleUrls: ['./application-form-giras.component.scss']
})
export class ApplicationFormGirasComponent implements OnInit {

  completeLoad = false;

  constructor(
    private datePipe: DatePipe,
    private giraService: GiraService,
    private toastService: ToastService) { }

  giras: Gira[] = [];

  ngOnInit(): void {
    this.loadOpenGiras();
  }

  loadOpenGiras(){
    this.giraService.getActivesGiras().subscribe({
      next: (val: any) => {
        this.giras = val;
        this.completeLoad = true;
      },
      error: (err: any) => {
        console.error(err);
        this.completeLoad = true;
        this.toastService.show('Houve um erro ao tentar consultar as proximas Giras. Tente novamente mais tarde.', { classname: 'bg-danger text-light', delay: 15000 });
      },
    });
  }

  translateDayName(date: Date): string {
    const day = this.datePipe.transform(date, 'EEEE')?.toLowerCase();

    switch (day) {
      case 'sunday':
        return 'Domingo';
      case 'monday':
        return 'Segunda-feira';
      case 'tuesday':
        return 'Terça-feira';
      case 'wednesday':
        return 'Quarta-feira';
      case 'thursday':
        return 'Quinta-feira';
      case 'friday':
        return 'Sexta-feira';
      case 'saturday':
        return 'Sábado';
      default:
        return ''; // Handle any unexpected cases
    }
  }
}
