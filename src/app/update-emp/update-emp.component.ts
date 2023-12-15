import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-emp',
  templateUrl: './update-emp.component.html',
  styleUrls: ['./update-emp.component.scss'],
})
export class UpdateEmpComponent implements OnDestroy {
  destroyed = new Subject<void>();
  currentScreenSize: string = '';

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

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
    private _router: ActivatedRoute,
    private _redirect: Router,
    breakpointObserver: BreakpointObserver,
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
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnInit(): void {
    console.log(this._router.snapshot.params['id']);
    this._empService
      .getCurrentEmployee(this._router.snapshot.params['id'])
      .subscribe((emp) => {
        console.log(emp);
        this.empForm = new FormGroup({
          firstName: new FormControl(emp['firstName']),
          lastName: new FormControl(emp['lastName']),
          email: new FormControl(emp['email']),
          dob: new FormControl(emp['dob']),
          gender: new FormControl(emp['gender']),
          education: new FormControl(emp['education']),
          company: new FormControl(emp['company']),
          experience: new FormControl(emp['experience']),
          package: new FormControl(emp['package']),
        });
      });
    // this.empForm.patchValue(this.data);
    // console.log(this.data);
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      this._empService
        .updateEmployee(this._router.snapshot.params['id'], this.empForm.value)
        .subscribe({
          next: (val: any) => {
            console.log(val);
            alert('Employee updated successfully');
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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
