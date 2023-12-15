import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { UpdateEmpComponent } from './update-emp/update-emp.component';
import { AppComponent } from './app.component';
import { MainTableComponent } from './main-table/main-table.component';

const routes: Routes = [
  {
    path: '',
    component: MainTableComponent,
  },
  {
    path: 'create',
    component: CreateEmpComponent,
  },
  {
    path: 'update/:id',
    component: UpdateEmpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
