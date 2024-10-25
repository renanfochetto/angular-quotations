import { Component } from '@angular/core';
import { FrasesService } from "../../services/frases.service";
import { BotaoComponent } from "../botao/botao.component";
import { CommonModule } from '@angular/common';
import { Frase } from "../../interfaces/frases.interface";
import { TraducaoService } from "../../services/traducao.service";
import { Traducao } from "../../interfaces/traducao.interface";

@Component({
  selector: 'app-frases',
  standalone: true,
  imports: [
    BotaoComponent,
    CommonModule
  ],
  templateUrl: './frases.component.html',
  styleUrl: './frases.component.css'
})
export class FrasesComponent {
  fraseDoDia: string = '';
  autor: string = '';
  fraseTraduzida: string = '';
  isLoading: boolean = false;

  constructor(
    private frasesService: FrasesService,
    private traducaoService: TraducaoService
  ) { }

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
