import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeeComponent } from './list-employee.component';
@NgModule({
  declarations: [CreateEmployeeComponent, ListEmployeeComponent],
  imports: [CommonModule, ReactiveFormsModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
