import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddadeviceComponent } from './addadevice.component';

describe('AddadeviceComponent', () => {
  let component: AddadeviceComponent;
  let fixture: ComponentFixture<AddadeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddadeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddadeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
