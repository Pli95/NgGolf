import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeeTypeComponent } from './tee-type.component';

describe('TeeTypeComponent', () => {
  let component: TeeTypeComponent;
  let fixture: ComponentFixture<TeeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
