import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private http: HttpClient, private router: Router) {}

onSubmit() {
this.http.post<any>('http://localhost:5291/api/Auth/login', {
  username: this.username,
  password: this.password
}).subscribe({
    next: res => {
  if (res.token) {
    this.router.navigate(['/movie-catalog']);
  } else {
    this.message = 'Login fallido.';
  }
},
    error: err => {
      if (err.status === 401) {
        this.message = 'Usuario o contraseña incorrectos.';
      } else {
        this.message = 'Error del servidor.';
      }
    }
  });
}
}

