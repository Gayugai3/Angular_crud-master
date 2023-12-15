import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from './services/employee.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-app';

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.getEmployeeList();
  }

  openAddEditEmpForm() {
    this._router.navigate(['/create']);

    // const dialogRef = this._dialog.open(EmpAddEditComponent);
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployeeList();
    //     }
    //   },
    // });
  }
}
