import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  fullNameLength = 0;
  constructor(private fb: FormBuilder) {}

  onLoadDataClick(): void {
    this.employeeForm.setValue({
      fullName: 'Rohan Abraham',
      email: 'rabraham@orthofx.com',
      skills: {
        skillName: 'Java',
        experienceInYears: 0,
        proficiency: 'beginner',
      },
    });
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['beginner'],
      }),
    });
    this.employeeForm
      .get('fullName')
      ?.valueChanges.subscribe((value: string) => {
        this.fullNameLength = value.length;
      });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].value);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}
