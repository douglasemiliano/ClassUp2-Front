import { Component, OnInit } from '@angular/core';
import { AtividadeService } from '../../services/atividade.service';
import { Atividade } from '../../models/Atividade.model';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-atividades-form',
  templateUrl: './atividade-form.component.html',
  styleUrls: ['./atividade-form.component.scss'],
  imports:[FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  standalone: true
})
export class AtividadeFormComponent implements OnInit {
  atividade: Atividade = {
    titulo: '',
    descricao: '',
    dia: 0,
    mes: 0,
    ano: 0,
    horas: 0,
    minutos: 0,
    horaEntrega: '',
    pontuacaoMaxima: 0,
  };

  constructor(private atividadeService: AtividadeService, private route: ActivatedRoute) {}

  ngOnInit() {

  }

  onSubmit() {
    this.atividade.horaEntrega = `${this.atividade.ano}-${this.atividade.mes}-${this.atividade.dia}T${this.atividade.horas}:${this.atividade.minutos}:00Z`;

    this.atividadeService.criarAtividade(this.atividade).subscribe({
      next: (response) => {
        console.log('Atividade criada com sucesso!', response);
      },
      error: (error) => {
        console.error('Erro ao criar atividade:', error);
      },
    });
  }
}
