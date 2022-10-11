import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormArray,
} from '@angular/forms';
import { __values } from 'tslib';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

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
  };

  formErrors = {
    fullName: '',
    email: '',
    confirmEmail: '',
    emailGroup: '',
    phone: '',
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
      skills: this.fb.array([this.addSkillFormGroup()]),
    });

    this.employeeForm
      .get('contactPreference')
      ?.valueChanges.subscribe((data: string) => {
        this.onContactPreferenceChange(data);
      });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    this.route.paramMap.subscribe((params) => {
      const empId = params.get('id');
      if (empId) {
        this.getEmployee(+empId);
      }
    });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => this.editEmployee(employee),
      (err: any) => console.log(err)
    );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone,
    });
    this.employeeForm.setControl(
      'skills',
      this.setExistingSkills(employee.skills)
    );
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray(<any>[]);
    skillSets.forEach((s) => {
      formArray.push(
        this.fb.group({
          skillName: s.skillName,
          experienceInYears: s.experienceInYears,
          proficiency: s.proficiency,
        })
      );
    });
    return formArray;
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required],
    });
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
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

      (this.formErrors as any)[key] = '';
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched ||
          abstractControl.dirty ||
          abstractControl.value !== '')
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
    (confirmEmailControl?.pristine && confirmEmailControl.value === '')
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
