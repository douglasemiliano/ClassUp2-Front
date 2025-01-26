import { Component, inject } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';

@Component({
  selector: 'app-listar-atividade',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule],
  templateUrl: './listar-atividade.component.html',
  styleUrl: './listar-atividade.component.scss'
})
export class ListarAtividadeComponent {

  curso: any

  atividades: any[];

  imagem: string = environment.imagemPadraoAtividade;

  private route = inject(ActivatedRoute);

  private authService = inject(AuthGoogleService);

  profile = this.authService.profile();
  usuarioLogado = this.authService.idUser();

  private service = inject(AtividadeService);
  cursoAtual = this.service.curso();

  IsMyCourse: boolean = false;

  constructor(){
    console.log(this.cursoAtual);
    console.log(this.usuarioLogado);
    console.log(this.authService.getUserId());
    
    this.getIdRoute();
    // this.service.cursoAtual.subscribe({
    //   next: (data: any) => {
    //     this.curso = data;
    //     this.IsMyCourse = this.curso.idProprietario === this.usuarioLogado();
    //     if(this.IsMyCourse) {
    //       this.listarTodasAtividades(data.id)
    //     }
    //     this.listarAtividades(data.id);
    //   }
    // })
  }

  listarAtividades(idCurso: string){
    this.service.listarMinhasAtividades(idCurso, this.authService.getUserId()!).subscribe({
      next: (data: any) => {
        // this.IsMyCourse = data.creatorUserId == this.usuarioLogado();
        console.log(this.IsMyCourse);
        
        this.atividades = data;
      }
    })
  }
  
  listarTodasAtividades(idCurso: string){
    this.service.listarTodasAtividades(idCurso).subscribe({
      next: (data: any) => {
        this.IsMyCourse = data.creatorUserId == this.usuarioLogado;
        console.log(this.IsMyCourse);
        
        this.atividades = data;
      }
    })
  }

  getIdRoute() {
    this.route.params.subscribe((params: any) => {
      console.log("testando", this.cursoAtual.idProprietario);
      console.log("testando 2", this.authService.getUserId());
      
      this.IsMyCourse = this.cursoAtual.idProprietario == this.authService.getUserId();

      if (this.IsMyCourse) {
        this.listarTodasAtividades(this.cursoAtual.id)
      } else {
        this.listarAtividades(params.id)
      }

    });
  }

  goToClassroom(link: string){
    if (typeof window !== "undefined") {
      window.open(link, "_blank");
   }
  }

}
