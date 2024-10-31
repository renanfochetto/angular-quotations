import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FotoService } from "./services/foto/foto.service";
import { FrasesComponent } from "./components/frases/frases.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrasesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title: string = 'Visual Quotes';
  nomeAutor: string = 'Simon Berger';
  linkFoto: string = 'https://unsplash.com/pt-br/fotografias/fotografia-de-paisagem-de-montanhas-twukN12EN7c';
  descricaoAutor: string = 'Foto de ';

  constructor(private fotoService: FotoService) {}

  ngOnInit(): void {
    this.definirImagemFundo();
  }

  private definirImagemFundo(): void {
    this.fotoService.getFoto().subscribe({

      next: (photo) => {

        document.body.style.backgroundImage = `url(${photo.urls.regular})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';

        this.nomeAutor = (photo.user && photo.user.name) ? photo.user.name : 'Unsplash';
        this.linkFoto = photo.links.html;
    },
    error: (error) => {

      console.error('Erro ao obter imagem', error);

      document.body.style.backgroundImage = 'url(../assets/images/background-simon-berger.jpg)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      }
    });
  }
}
