import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userService = inject(UsersService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isLoggedIn: boolean = false;
  userAvatar: string | null = null;
  userName: string | null = null;
  menuOpen: boolean = false;

  // Variable para almacenar el texto de búsqueda
  searchQuery: string = '';

  // Lista de cursos disponibles para la búsqueda
  availableCourses: string[] = [
    'PHP y Bases de datos',
    'Diseño Web',
    'Phyton',
    'Java',
    'JavaScript',
    'C++',
  ]; // Cursos disponibles

  constructor() {}

  ngOnInit() {
    this.userService.loginStatus$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserData();
      }
    });
  }

  loadUserData() {
    const userName = localStorage.getItem('user_nombre');
    this.userName = userName || 'usuario';
    this.userAvatar =
      localStorage.getItem('user_avatar') ||
      '/assets/images/default-avatar.png';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.userService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  // Método para manejar la búsqueda de cursos
  searchCourse() {
    const foundCourse = this.availableCourses.find(
      (course) => course.toLowerCase() === this.searchQuery.toLowerCase()
    );

    if (foundCourse) {
      // Si el curso está disponible, redirige a la página de /cursos
      this.router.navigate(['/cursos']);
    } else {
      // Si no está disponible, muestra una alerta o redirige a una página de error
      alert('El curso que buscas no está disponible.');
      // También puedes redirigir a una página de "curso no encontrado" si prefieres
      // this.router.navigate(['/curso-no-encontrado']);
    }
  }
}
