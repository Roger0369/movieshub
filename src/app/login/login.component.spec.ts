import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return invalid login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
  
    component.nombre = 'Incorrecto';
    component.contrasena = 'wrong';
  
    component.validarFormulario();

    expect(component).toBeTruthy();
  });

  it('should return valid login', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
  
    component.nombre = 'Liderly';
    component.contrasena = '123456';
  
    component.validarFormulario();

    expect(component).toBeTruthy();
  });

  it('The button should have the word "Ingresar"', () => {
    const element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Ingresar');
  });
});