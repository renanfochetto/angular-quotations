import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { BotoesInteracaoComponent } from "../botoes-interacao/botoes-interacao.component";
import { FrasesService } from "../../services/frases.service";
import { TraducaoService } from "../../services/traducao.service";
import { Frase } from "../../interfaces/frases.interface";
import { Traducao } from "../../interfaces/traducao.interface";

@Component({
  selector: 'app-frases',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    BotoesInteracaoComponent
  ],
  templateUrl: './frases.component.html',
  styleUrl: './frases.component.css'
})

export class FrasesComponent {
  idiomaSelecionado: string = 'pt';
  fraseDoDia: string = '';
  autor: string = '';
  fraseTraduzida: string = '';
  isLoading: boolean = false;
  foiCurtido: boolean = false;
  copiado: boolean = false;
  titulo: string = 'Que tal uma citação para o dia de hoje?';
  botaoTexto: string = 'Gerar Citação';

  constructor(
    private frasesService: FrasesService,
    private traducaoService: TraducaoService
  ) { }

  atualizarIdioma(novoIdioma: string): void {
    this.idiomaSelecionado = novoIdioma;
    this.titulo = novoIdioma === 'pt' ? 'Que tal uma citação para o dia de hoje?' : 'How about a quote for today?';
    this.botaoTexto = novoIdioma === 'pt' ? 'Gerar Citação' : 'Generate Quote';
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

  traduzirFrase(texto: string): void {
    this.isLoading = true
    if(this.idiomaSelecionado === 'en') {
      this.fraseTraduzida = texto;
      this.isLoading = false
      this.aplicarFadeIn();
    } else {
      this.isLoading = true;
      this.traducaoService.translate(texto,'en', 'pt').subscribe({
        next: (data: Traducao): void => {
          this.fraseTraduzida = data.responseData.translatedText;
          this.isLoading = false;
          this.aplicarFadeIn();
      },
        error: (error: any): void => {
          console.error('Não conseguimos traduzir a frase. Que tal tentar novamente mais tarde?', error);
          this.isLoading = false;
      }
    });
    }
  }

  aplicarFadeIn(): void {
    const fraseElement = document.querySelector('.frase') as HTMLElement;
    if (fraseElement) {
      fraseElement.classList.remove('fade-in');
      fraseElement.offsetWidth;
      requestAnimationFrame((): void => {
        fraseElement.classList.add('fade-in');
      });
    }
  }
}
