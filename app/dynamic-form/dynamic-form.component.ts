import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
  config = {
    fields: [
      {
        type: 'text',
        name: 'fullName',
        label: 'Full Name',
        placeholder: 'Enter full name'
      },
      {
        type: 'number',
        name: 'age',
        label: 'Age',
      },
      {
        type: 'dropdown',
        name: 'gender',
        label: 'Gender',
        options: [
          { key: 'm', label: 'Male' },
          { key: 'f', label: 'Female' }
        ]
      }
    ],
    buttonSetting: {
      buttons: [
        { type: 'submit', caption: 'Submit', bgColor: 'blue' },
        { type: 'reset', caption: 'Reset', bgColor: 'orange' },
        { type: 'cancel', caption: 'Cancel', bgColor: 'light' }
      ]
    }
  };

  formValue = {
    fullName: 'John Doe',
    age: 30,
    gender: 'm'
  };

  submit(form: FormGroup) {
    console.log('Form submitted', form.value);
  }

  cancel() {
    console.log('Form cancelled');
  }

}
