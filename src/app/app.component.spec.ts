import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FotoService } from "./services/foto.service";
import { of, throwError } from "rxjs";
import { expect } from '@jest/globals';

describe('AppComponent', () => {
  let app: AppComponent;
  let fotoService: FotoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: FotoService,
          useValue: {
            getFoto: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fotoService = TestBed.inject(FotoService);
    app = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('deve criar a aplicação', () => {
    expect(app).toBeTruthy();
  });

  it(`deve ter o título 'Visual Quotes'`, () => {
    expect(app.title).toEqual('Visual Quotes');
  });

  it('deve definir a imagem de fundo corretamente ao iniciar', () => {
    const mockPhotoResponse = {
      urls: {
        regular: 'https://example.com/image.jpg'
      }
    };
    jest.spyOn(fotoService, 'getFoto').mockReturnValue(of(mockPhotoResponse));
    app.ngOnInit();

    expect(document.body.style.backgroundImage).toBe(`url(${mockPhotoResponse.urls.regular})`);
    expect(document.body.style.backgroundSize).toBe('cover');
    expect(document.body.style.backgroundPosition).toBe('center');
  });

  it('deve exibir um erro ao obter a imagem de fundo', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(fotoService, 'getFoto').mockReturnValue(throwError(() => new Error('Erro ao obter imagem')));
    app.ngOnInit();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao obter imagem', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});
