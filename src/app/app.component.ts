import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FotoService } from "./services/foto/foto.service";
import { FrasesComponent } from "./components/frases/frases.component";
import { AutorComponent } from "./components/autor/autor.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FrasesComponent, AutorComponent],
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

        this.nomeAutor = photo.user.name;
        this.linkFoto = photo.links.html;
    },
    error: (error) => {
      console.error('Erro ao obter imagem', error);
      document.body.style.backgroundImage = 'url(../assets/background-simon-berger.jpg)';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      }
    });
  }
}
