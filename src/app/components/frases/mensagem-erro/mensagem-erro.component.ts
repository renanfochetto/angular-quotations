import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagem-erro',
  standalone: true,
  imports: [],
  templateUrl: './mensagem-erro.component.html',
  styleUrl: './mensagem-erro.component.css'
})

export class MensagemErroComponent {
  @Input() mensagemErro: string = '';
}
