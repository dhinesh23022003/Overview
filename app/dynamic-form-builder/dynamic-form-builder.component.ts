import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css']
})
export class DynamicFormBuilderComponent implements OnInit {


  @Input() config: any;
  @Input() formValue: any;
  @Output() submit = new EventEmitter<FormGroup>();
  @Output() cancel = new EventEmitter<void>();

  formGroup: FormGroup;
  isSubmit: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formGroup=this.fb.group({});
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.config.fields.forEach((field: any) => {
      group[field.name] = [this.formValue[field.name] ];
    });
    this.formGroup = this.fb.group(group);
  }


  onSubmit() {
    this.isSubmit = true;
    if (this.formGroup.valid) {
      this.submit.emit(this.formGroup);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
