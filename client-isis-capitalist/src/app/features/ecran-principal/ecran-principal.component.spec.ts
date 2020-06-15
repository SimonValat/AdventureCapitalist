import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcranPrincipalComponent } from './ecran-principal.component';

describe('EcranPrincipalComponent', () => {
  let component: EcranPrincipalComponent;
  let fixture: ComponentFixture<EcranPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcranPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcranPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
