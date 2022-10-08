import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
  FormControl,
} from '@angular/forms';
import { __values } from 'tslib';
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  onLoadDataClick(): void {
    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
    ]);

    console.log(formArray1);
  }

  validationMessages = {
    fullName: {
      required: 'Full Name is required',
      minlength: 'Full Name must be greater than 2 characters',
      maxlength: 'Full Name must be less than 10 characters',
    },
    email: {
      required: 'Email is required',
      emailDomain: 'Email domain should be gmail.com',
    },
    confirmEmail: {
      required: 'Confirm Email is required',
    },
    emailGroup: {
      emailMismatch: 'Email and Confirm Email do not match',
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
    confirmEmail: '',
    emailGroup: '',
    phone: '',
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
      contactPreference: ['email', Validators.required],
      emailGroup: this.fb.group(
        {
          email: [
            '',
            [Validators.required, CustomValidators.emailDomain('gmail.com')],
          ],
          confirmEmail: ['', Validators.required],
        },
        { validators: matchEmails }
      ),
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required],
      }),
    });

    this.employeeForm
      .get('contactPreference')
      ?.valueChanges.subscribe((data: string) => {
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
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      console.log(abstractControl);
      (this.formErrors as any)[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = (this.validationMessages as any)[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            (this.formErrors as any)[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls['fullName'].value);
    console.log(this.employeeForm.get('fullName')?.value);
  }
}

function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');
  if (
    emailControl?.value === confirmEmailControl?.value ||
    confirmEmailControl?.pristine
  ) {
    return null;
  } else {
    return { emailMismatch: true };
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
