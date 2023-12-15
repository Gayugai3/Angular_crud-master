import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-create-emp',
  templateUrl: './create-emp.component.html',
  styleUrls: ['./create-emp.component.scss'],
})
export class CreateEmpComponent implements OnInit {
  empForm: FormGroup;
  // salary: number = 0;
  dataSource!: MatTableDataSource<any>;
  education: string[] = [
    'Matrice',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _redirect: Router,
    private _dialogRef: MatDialogRef<CreateEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      education: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
      package: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value);
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this._empService.getEmployeeList().subscribe({
            next: (res) => {
              console.log(res);
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            },
            error: console.log,
          });
        },
        error: (err: any) => {
          console.error(err);
        },
      });
      this._redirect.navigate(['/']);
    }
  }

  calculatePackage() {
    let yearsOfExperience: number = this.empForm.get('experience')?.value;

    console.log(yearsOfExperience);
    if (yearsOfExperience >= 0 && yearsOfExperience < 2) {
      this.empForm.patchValue({ package: 50000 });
      // this.salary = 50000;
    } else if (yearsOfExperience >= 2 && yearsOfExperience < 5) {
      this.empForm.patchValue({ package: 70000 });
      // this.salary = 70000;
    } else if (yearsOfExperience >= 5) {
      this.empForm.patchValue({ package: 90000 });
      // this.salary = 90000;
    } else {
      this.empForm.patchValue({ package: 0 });
      // this.salary = 0;
    }
    console.log(this.empForm.value);
  }

  returnHome() {
    this._redirect.navigate(['/']);
  }
}
