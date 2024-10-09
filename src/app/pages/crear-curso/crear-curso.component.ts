import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CursoService } from '../../services/curso.service';


@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.css'
})
export class CrearCursoComponent {

  curso = {
    nombre: '',
    descripcion: '',
    docenteId: ''
  };

  private cursoService = inject(CursoService);
  private router = inject(Router);


  onSubmit(){
    if (this.curso.nombre && this.curso.descripcion && this.curso.docenteId) {
      this.cursoService.crearCurso(this.curso).subscribe(
        (response) => {
          console.log('Curso creado exitosamente:', response);
          // Redirigir a la vista de gestión de cursos
          this.router.navigate(['/teacher-dashboard']);
        },
        (error) => {
          console.error('Error al crear el curso:', error);
        }
      );
    } else {
      console.error('Por favor completa todos los campos');
    }
  }
}