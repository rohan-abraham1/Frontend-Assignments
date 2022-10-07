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
  constructor(private fb: FormBuilder) {}

  onLoadDataClick(): void {
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
    
  }

  validationMessages= {
    fullName : {
      required: 'Full Name is required',
      minlength: 'Full Name must be greater than 2 characters',
      maxlength: 'Full Name must be less than 10 characters',
    },
    email: {
      required: 'Email is required',
    },
    skillName: {
      required: 'Skill Name is required',
    },
    experienceInYears: {
      required: 'Experience is required',
    },
    proficiency: {
      required: 'Proficiency is required',
    },
  };

  formErrors = {
    fullName: '',
    email: '',
    skillName: '',
    experienceInYears: '',
    proficiency: '',
  };

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
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });
  }

  logValidationErrors(group: FormGroup): void {
    console.log(
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        } else {
          (this.formErrors as any)[key] = '';
          if (abstractControl && !abstractControl.valid) {
            const messages = (this.validationMessages as any)[key];
            for (const errorKey in abstractControl.errors){
              if(errorKey){
                (this.formErrors as any)[key] += messages[errorKey] + ' ';
              }
            }
          }
        }
      })
    );
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].value);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}


// type validationMessagesType = {
//   [key in modelTypes] : validationType
// }

// type validationType = {
//   required?: string;
//   minlength?: string;
//   maxlength?: string;
// }

// enum modelTypes {
//   fullname = 'fullname'
// }