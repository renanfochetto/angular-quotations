import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [],
  templateUrl: './autor.component.html',
  styleUrl: './autor.component.css'
})

export class AutorComponent {
  @Input() nomeAutor: string = '';
  @Input() linkFoto: string = '';
  @Input() descricaoAutor: string = '';
}
