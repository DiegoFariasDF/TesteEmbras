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

public publicidadeSelecionada: any = null;

publicidadesFiltradas: any[] = [];

public estados: any[] = [];

public publicidades: any[] = [];

menuAberto: number | null = null;

estadoSelecionado: string = '';

textoBusca: string = '';

modalNova: boolean = false;

imagemNome: string = '';

hoje: string = new Date().toISOString().split('T')[0];

modalEditar: boolean = false;

constructor(private publicidadeService: Publicidade) { }

ngOnInit() {
this.ObterTodasPublicidade();
this.ObterEstados();
}

onFileSelected(event: any) {
this.arquivoSelecionado = event.target.files[0];
}


toggleMenu(id: number){
  if(this.menuAberto === id){
    this.menuAberto = null;
  }else{
    this.menuAberto = id;
  }
}

filtrarEstado(event: any){
  this.estadoSelecionado = event.target.value;
  this.aplicarFiltros();
}

pesquisar(event: any){
  this.textoBusca = event.target.value.toLowerCase();
  this.aplicarFiltros();
}

aplicarFiltros(){

  this.publicidadesFiltradas = this.publicidades.filter(pub => {

    const filtroEstado =
      !this.estadoSelecionado ||
      pub.estados?.some((est: any) => est.sigla === this.estadoSelecionado);

    const filtroTexto =
      !this.textoBusca ||
      pub.titulo.toLowerCase().includes(this.textoBusca.toLowerCase()) ||
      pub.descricao.toLowerCase().includes(this.textoBusca.toLowerCase());

    return filtroEstado && filtroTexto;

  });

}

// selecionar publicidade para edição
SelecionarPublicidade(pub: any) {
  this.publicidadeSelecionada = { ...pub };
  this.modalEditar = true;
}

FecharModal() {
  this.modalEditar = false;
  this.publicidadeSelecionada = null;
}

AbrirModalNova() {
  this.modalNova = true;
  this.arquivoSelecionado = null;
}

FecharModalNova() {
  this.modalNova = false;
  this.arquivoSelecionado = null;
}

ObterEstados() {
  this.publicidadeService.ObterEstados()
    .then((dados: any) => {
      this.estados = dados;
      console.log('Estados:', this.estados);
    })
    .catch(err => console.error(err));
}

ObterTodasPublicidade(){
this.publicidadeService.ObterTodasPublicidade()
.then(dados => {
this.publicidades = dados;
this.publicidadesFiltradas = dados;
console.log(this.publicidades);
})
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
estado: any,
inicio: string,
fim: string
) {

const formData = new FormData();

formData.append('titulo', titulo);
formData.append('descricao', descricao);
formData.append('botao_link', link);
formData.append('titulo_botao_link', tituloLink);
formData.append('id_publicidade_estado[]', Number(estado).toString());
formData.append('dt_inicio', inicio);
formData.append('dt_fim', fim);

if (this.arquivoSelecionado) {
  formData.append('imagem', this.arquivoSelecionado);
}

this.publicidadeService.EditarPublicidade(id, formData)
  .then(res => {
    console.log('Sucesso ao editar!', res);
    this.ObterTodasPublicidade();
    alert('Publicidade atualizada com sucesso!');
    this.arquivoSelecionado = null;
    this.publicidadeSelecionada = null;
  })
  .catch(err => {
    console.error('Erro na edição:', err);
    alert('Erro ao editar.');
  });

}

Adicionar(
titulo: string,
descricao: string,
link: string,
tituloLink: string,
estado: any,
inicio: string,
fim: string
) {

const formData = new FormData();

formData.append('titulo', titulo);
formData.append('descricao', descricao);
formData.append('botao_link', link);
formData.append('titulo_botao_link', tituloLink);

const estadosSelecionados = Array.from(estado.selectedOptions).map((opt: any) => opt.value);

estadosSelecionados.forEach((id: any) => {
  formData.append('id_publicidade_estado[]', id);
});

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