import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css'
})
export class BotaoComponent {
  @Output() gerarFrase: EventEmitter<void> = new EventEmitter<void>();


  quandoClicado(): void {
    this.gerarFrase.emit();
  }
}
