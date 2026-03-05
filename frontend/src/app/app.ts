import { Component, OnInit } from '@angular/core';
import { Publicidade } from './publicidade';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class App implements OnInit { 
  arquivoSelecionado: File | null = null;

  constructor(private publicidadeService: Publicidade) { }

  ngOnInit() { }

  onFileSelected(event: any) {
    this.arquivoSelecionado = event.target.files[0];
  }

  ObterTodasPublicidade(){
    this.publicidadeService.ObterTodasPublicidade()
    .then(Publicidade => console.log(Publicidade))
    .catch(error => console.error(error));
  }

  ObterUmaPublicidade(id: number) {
    this.publicidadeService.ObterPorId(id)
    .then(dado => console.log('Publicidade detalhada:', dado))
    .catch(err => console.error(err));
  }

  Deletar(id: number) {
    if(confirm('Tem certeza que deseja excluir?')) {
      this.publicidadeService.ExcluirPublicidade(id)
        .then(() => {
          console.log('Excluído com sucesso!');
          this.ObterTodasPublicidade();
        });
    }
  }

  Editar(
    id: number, 
    titulo: string, 
    descricao: string, 
    link: string, 
    tituloLink: string, 
    estado: number, 
    inicio: string, 
    fim: string
  ) {
    //formdata para encaminhr img
    const formData = new FormData();
    
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('botao_link', link);
    formData.append('titulo_botao_link', tituloLink);
    
    // enviado como array
   formData.append('id_publicidade_estado[]', estado.toString());
    
    formData.append('dt_inicio', inicio);
    formData.append('dt_fim', fim);

    
    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado);
    }

    
    this.publicidadeService.EditarPublicidade(id, formData)
      .then(res => {
        console.log('Sucesso ao editar tudo com imagem!', res);
        this.ObterTodasPublicidade();
        alert('Publicidade atualizada com sucesso!');
        this.arquivoSelecionado = null; 
      })
      .catch(err => {
        console.error('Erro na edição completa:', err);
        alert('Erro ao editar. Verifique os campos no console.');
      });
  }

  Adicionar(titulo: string, descricao: string, link: string, tituloLink: string, estado: number, inicio: string, fim: string) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('botao_link', link);
    formData.append('titulo_botao_link', tituloLink);
    formData.append('id_publicidade_estado[]', estado.toString()); // O ajuste do array que funcionou!
    formData.append('dt_inicio', inicio);
    formData.append('dt_fim', fim);

    if (this.arquivoSelecionado) {
      formData.append('imagem', this.arquivoSelecionado);
    }

    this.publicidadeService.AdicionarPublicidade(formData)
      .then(res => {
        console.log('Nova publicidade criada!', res);
        this.ObterTodasPublicidade();
        alert('Criado com sucesso!');
      })
      .catch(err => console.error('Erro ao criar:', err));
  }
}