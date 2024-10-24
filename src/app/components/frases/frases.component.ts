import { Component } from '@angular/core';
import { FrasesService } from "../../services/frases-service";
import { BotaoComponent } from "../botao/botao.component";
import { CommonModule } from '@angular/common';
import { Frase } from "../../interfaces/frases-interface";

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
  fraseHtml: string = '';

  constructor(
    private frasesService: FrasesService) { }

  gerarFraseDoDia(): void {
    this.frasesService.obterFraseDoDia().subscribe({
      next: (data: Frase[]): void => {
        this.fraseDoDia = data[0].q;
        this.autor = data[0].a;
        this.fraseHtml = data[0].h;
      },
      error: (error: any): void => {
        console.error('Não conseguimos obter a frase do dia. Que tal tentar novamente mais tarde?', error);
      }
    })
  }


}
