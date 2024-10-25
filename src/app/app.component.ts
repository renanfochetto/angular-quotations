import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrasesComponent } from "./components/frases/frases.component";
import { HttpClientModule } from "@angular/common/http";
import { FotoService } from "./services/foto.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrasesComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'angular-quotations';

  constructor(private fotoService: FotoService) {}

  ngOnInit(): void {
    this.definirImagemFundo();
  }

  definirImagemFundo(): void {
    this.fotoService.getFoto().subscribe({
      next: (photo) => {
        document.body.style.backgroundImage = `url(${photo.urls.regular})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    },
    error: (error) => {
      console.error('Erro ao obter imagem', error);
      }
    });
  }
}
