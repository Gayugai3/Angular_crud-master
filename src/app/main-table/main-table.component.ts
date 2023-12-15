import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
// import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
// import { CreateEmpComponent } from './create-emp/create-emp.component';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this._empService.deleteEmployee(id).subscribe({
        next: (res) => {
          alert('Employee Delete Success');
          this.getEmployeeList();
        },
        error: console.log,
      });
    }
  }

  openEditEmpForm(data: any) {
    console.log(data.id);
    this._router.navigate(['/update', data.id]);

  }
}
