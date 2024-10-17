import { Component, inject, OnInit } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-course-viewcard',
  standalone: true,
  imports: [RouterLinkWithHref, NgFor, NgIf],
  templateUrl: './course-viewcard.component.html',
  styleUrl: './course-viewcard.component.css'
})
export class CourseViewcardComponent implements OnInit{
  private cursoService = inject(CursoService)

  cursos: any[] = [];
  userId: string = '';

  ngOnInit(): void{
    console.log(this.userId)
    this.cursoService.obtenerCursoPorUsuario(this.userId).subscribe(
      (response) => {
        this.cursos = response.data
        console.log("Informacion de cursos: ", response.data)
      },
      (error) => {
        console.error('error', error)
      }
    );
  }
}
