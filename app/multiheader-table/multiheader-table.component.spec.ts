import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiheaderTableComponent } from './multiheader-table.component';

describe('MultiheaderTableComponent', () => {
  let component: MultiheaderTableComponent;
  let fixture: ComponentFixture<MultiheaderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiheaderTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiheaderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
