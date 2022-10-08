import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
    
  }

  validationMessages= {
    fullName : {
      required: 'Full Name is required',
      minlength: 'Full Name must be greater than 2 characters',
      maxlength: 'Full Name must be less than 10 characters',
    },
    email: {
      required: 'Email is required',
      emailDomain: 'Email domain shoudl be Gmail.com',
    },
    phone: {
      required: 'Phone is required',
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
    phone:'',
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
      contactPreference: ['email',Validators.required],
      email: ['', [Validators.required, emailDomain]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });

    this.employeeForm.get('contactPreference')?.valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

 

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl?.setValidators(Validators.required);
    }
    else{
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
      Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
        } else {
    console.log(abstractControl);
          (this.formErrors as any)[key] = '';
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
            const messages = (this.validationMessages as any)[key];
            for (const errorKey in abstractControl.errors){
              if(errorKey){
                (this.formErrors as any)[key] += messages[errorKey] + ' ';
              }
            }
          }
        }
      })
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].value);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}

function emailDomain (control: AbstractControl): {[key: string]: any} | null{
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@')+1);
  if(domain.toLocaleLowerCase() === 'gmail.com' || email === ''){
    return null;
  }
  else{
    return {'emailDomain': true};
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