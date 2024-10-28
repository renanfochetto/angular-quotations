import {Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-botoes-interacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botoes-interacao.component.html',
  styleUrl: './botoes-interacao.component.css'
})

export class BotoesInteracaoComponent {
  @Input() curtido: boolean = false;
  @Input() copiado: boolean = false;
  @Input() fraseTraduzida: string = '';
  @Output() curtir: EventEmitter<void> = new EventEmitter<void>();
  @Output() copiar: EventEmitter<void>  = new EventEmitter<void>();
  @Output() compartilhar: EventEmitter<void> = new EventEmitter<void>();

  alternarCurtir(): void {
    this.curtido = !this.curtido
    this.curtir.emit();
  }

  copiarFrase(): void {
      navigator.clipboard.writeText(this.fraseTraduzida).then(() => {
        this.copiado = true;
        setTimeout((): void => {
          this.copiado = false;
        }, 500);
        this.copiar.emit();
      }).catch(error => {
        console.error('Erro ao copiar a frase: ', error);
      });
    }

  compartilharFrase(): void {
    this.compartilhar.emit();
  }

}
