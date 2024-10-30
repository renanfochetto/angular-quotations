import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FotoService } from "./services/foto/foto.service";
import { FrasesComponent } from "./components/frases/frases.component";
import { ConfigService } from "./services/config/config.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FrasesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'Visual Quotes';

  constructor(
    private fotoService: FotoService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.carregarConfiguracao();
  }

  private carregarConfiguracao():void {
    this.configService.loadConfig().subscribe({
      next: (config) => {
        this.configService.setConfig(config);
        this.definirImagemFundo();
      },
      error: (error) => {
        console.error('Erro ao carregar a configuração', error);
      }
    })
  }

  private definirImagemFundo(): void {
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
