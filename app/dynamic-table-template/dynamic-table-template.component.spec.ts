import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTableTemplateComponent } from './dynamic-table-template.component';

describe('DynamicTableTemplateComponent', () => {
  let component: DynamicTableTemplateComponent;
  let fixture: ComponentFixture<DynamicTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicTableTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
