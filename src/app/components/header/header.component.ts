import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() idiomaMudou: EventEmitter<'pt' | 'en'> = new EventEmitter<'pt' | 'en'>();
  idiomaSelecionado: 'pt' | 'en' = 'pt';

  atualizarIdioma(): void {
    try {
      this.idiomaSelecionado = this.idiomaSelecionado === 'pt' ? 'en' : 'pt';
      this.idiomaMudou.emit(this.idiomaSelecionado);
    } catch (error) {
      console.error('Erro ao atualizar o idioma:', error);
    }
  }
}
