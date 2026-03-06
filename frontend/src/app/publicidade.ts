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

    const query = this.http.get<Ipublicidade>(`${API_PATH}/${id}`, { headers });

    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error(`Erro ao buscar a publicidade ${id}:`, error);
      throw error;
    }
  }

  ObterEstados(): Promise<any> {
  return this.http.get('http://localhost:8000/api/estados').toPromise();
  }
  
  async ExcluirPublicidade(id: number) {
    const query = this.http.delete(`${API_PATH}/${id}`);
    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error('Erro ao excluir:', error);
      throw error;
    }
  }

  async EditarPublicidade(id: number, dados: FormData) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    const query = this.http.post(`${API_PATH}/${id}?_method=PUT`, dados, { headers });
    
    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error('Erro ao editar com imagem:', error);
      throw error;
    }
  }

  async AdicionarPublicidade(dados: FormData) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    const query = this.http.post(`${API_PATH}`, dados, { headers });
    
    try {
      return await lastValueFrom(query);
    } catch (error) {
      console.error('Erro ao adicionar:', error);
      throw error;
    }
  }

}