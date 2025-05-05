import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  contrasena: string = '';

  constructor(private router: Router) {}

  validarFormulario() {
    if (this.nombre !== 'Liderly') {
      alert('Nombre de usuario no válido. Por favor, usa: Liderly');
      return;
    }

    if (this.contrasena !== '123456') {
      alert('Contraseña no válida. Por favor, usa: 123456');
      return;
    }

    const saludo = this.obtenerSaludo();
    alert(`Hola, ${saludo} ${this.nombre}, bienvenido`);

    this.router.navigate(['/catalogo']);
  }

  obtenerSaludo(): string {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return 'buenos días';
    if (hora >= 12 && hora < 18) return 'buenas tardes';
    return 'buenas noches';
  }
}
