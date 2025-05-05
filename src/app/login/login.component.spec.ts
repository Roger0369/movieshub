import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert if username is invalid', () => {
    spyOn(window, 'alert');
    component.nombre = 'OtroUsuario';
    component.contrasena = '123456';

    component.validarFormulario();

    expect(window.alert).toHaveBeenCalledWith('Nombre de usuario no válido. Por favor, usa: Liderly');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show alert if password is invalid', () => {
    spyOn(window, 'alert');
    component.nombre = 'Liderly';
    component.contrasena = 'incorrecta';

    component.validarFormulario();

    expect(window.alert).toHaveBeenCalledWith('Contraseña no válida. Por favor, usa: 123456');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate and greet properly when valid credentials are provided', () => {
    spyOn(window, 'alert');
    component.nombre = 'Liderly';
    component.contrasena = '123456';

    component.validarFormulario();

    expect(window.alert).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/catalogo']);
  });

  it('should return "buenos días" in the morning', () => {
    spyOn(Date.prototype, 'getHours').and.returnValue(8);
    expect(component.obtenerSaludo()).toBe('buenos días');
  });

  it('should return "buenas tardes" in the afternoon', () => {
    spyOn(Date.prototype, 'getHours').and.returnValue(14);
    expect(component.obtenerSaludo()).toBe('buenas tardes');
  });

  it('should return "buenas noches" at night', () => {
    spyOn(Date.prototype, 'getHours').and.returnValue(20);
    expect(component.obtenerSaludo()).toBe('buenas noches');
  });
});
