import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditeComponent } from './type-edite.component';

describe('TypeEditeComponent', () => {
  let component: TypeEditeComponent;
  let fixture: ComponentFixture<TypeEditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEditeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
