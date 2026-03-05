import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importado HttpHeaders
import { API_PATH } from '../environments/environment'; 
import { Ipublicidade } from './Ipublicidade'; 
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Publicidade {

  constructor(private http: HttpClient) { }

  async ObterTodasPublicidade() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    const query = this.http.get<Ipublicidade[]>(`${API_PATH}`, { headers });
    
    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error('Erro ao buscar publicidades:', error);
      throw error;
    }
  }

  async ObterPorId(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    // Monta a URL como: .../api/publicidade/1
    const query = this.http.get<Ipublicidade>(`${API_PATH}/${id}`, { headers });

    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error(`Erro ao buscar a publicidade ${id}:`, error);
      throw error;
    }
  }
}