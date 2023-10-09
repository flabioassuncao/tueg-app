import { Component, OnInit } from '@angular/core';
import { GiraService } from '../gira.service';
import { GiraPagination } from '../models/GiraModel';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-application-form-giras',
  templateUrl: './application-form-giras.component.html',
  styleUrls: ['./application-form-giras.component.scss']
})
export class ApplicationFormGirasComponent implements OnInit {

  completeLoad = false;

  constructor(
    private giraService: GiraService,
    private toastService: ToastService) { }

  giras: GiraPagination = { items: [], total: 0, page:0, size: 0, totalPages: 0 };

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
}
