import { Component, Input } from '@angular/core';
import { FrasesService } from "../../services/frases.service";
import { Frase } from "../../interfaces/frases.interface";
import { TraducaoService } from "../../services/traducao.service";
import { Traducao } from "../../interfaces/traducao.interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-frases',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './frases.component.html',
  styleUrl: './frases.component.css'
})

export class FrasesComponent {
  @Input() idiomaSelecionado: string = 'pt';
  fraseDoDia: string = '';
  autor: string = '';
  fraseTraduzida: string = '';
  isLoading: boolean = false;
  titulo: string = 'Que tal uma citação para o dia de hoje?';
  botaoTexto: string = 'Gerar Citação';
  isLiked: boolean = false;
  copiado: boolean = false;

  constructor(
    private frasesService: FrasesService,
    private traducaoService: TraducaoService
  ) { }

  atualizarIdioma(): void {
    this.idiomaSelecionado = this.idiomaSelecionado === 'pt' ? 'en' : 'pt';
    this.titulo = this.idiomaSelecionado === 'pt' ? 'Que tal uma citação para o dia de hoje?' : 'How about a quote for today?';
    this.botaoTexto = this.idiomaSelecionado === 'pt' ? 'Gerar Citação' : 'Generate Quote';
  }

  gerarFraseDoDia(): void {
    this.frasesService.obterFraseDoDia().subscribe({
      next: (data: Frase[]): void => {
        this.fraseDoDia = data[0].q;
        this.autor = data[0].a;
        this.traduzirFrase(this.fraseDoDia);
      },
      error: (error: any): void => {
        console.error('Não conseguimos obter a frase do dia. Que tal tentar novamente mais tarde?', error);
      }
    });
  }

  toggleLike() {
    this.isLiked = !this.isLiked; // Alterna entre curtido e não curtido
  }

  share() {
    console.log('Compartilhar'); // Adicione a lógica de compartilhamento aqui, se desejar
  }

  copiarFrase() {
    const frase = this.fraseTraduzida;

    navigator.clipboard.writeText(frase).then(() => {
      this.copiado = true;
      setTimeout(() => {
        this.copiado = false;
      }, 500);
    }).catch(err => {
      console.error('Erro ao copiar a frase: ', err);
    });
  }

  traduzirFrase(texto: string): void {
    if(this.idiomaSelecionado === 'en') {
      this.fraseTraduzida = texto;
    } else {
      this.isLoading = true;
      this.traducaoService.translate(texto,'en', 'pt').subscribe({
        next: (data: Traducao): void => {
          this.fraseTraduzida = data.responseData.translatedText;
          this.isLoading = false;
      },
        error: (error: any): void => {
          console.error('Não conseguimos traduzir a frase. Que tal tentar novamente mais tarde?', error);
          this.isLoading = false;
      }
    });
    }
  }
}
