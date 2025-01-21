import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Atividade } from '../models/Atividade.model';
import { environment } from '../../environments/environment';
import { AuthGoogleService } from './auth/auth-google.service';


@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
; // Substitua pelo seu endpoint real

private authService = inject(AuthGoogleService);


cursoAtual: BehaviorSubject<any> = new BehaviorSubject<any>(null);

constructor(private http: HttpClient) {}

criarAtividade(atividade: Atividade): Observable<Atividade> {
  return this.http.post<Atividade>(environment.apiUrl, atividade);
}

getHeader(): HttpHeaders{
  return new HttpHeaders({
    accessToken: `${this.authService.getAccessToken()}`,
  });
}


listarCursos(): Observable<any> {
    const headers = this.getHeader();
    return this.http.get<Atividade>(`${environment.apiUrl}/classroom/courses`, {headers});
  }

  listarAtividades(cursoId: string): Observable<any> {
    const headers = this.getHeader();
    return this.http.get<Atividade>(`${environment.apiUrl}/classroom/coursework/${cursoId}`, {headers});
  }

  login(){
    return this.http.get(`${environment.apiUrl}/auth-url`)
  }

  setCursoAtual(cursoId: any){
    this.cursoAtual.next(cursoId);
  }
}
