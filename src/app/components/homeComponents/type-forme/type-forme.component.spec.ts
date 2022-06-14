import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFormeComponent } from './type-forme.component';

describe('TypeFormeComponent', () => {
  let component: TypeFormeComponent;
  let fixture: ComponentFixture<TypeFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeFormeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
