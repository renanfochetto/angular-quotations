import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TraducaoService } from './traducao.service';
import { Traducao } from "../interfaces/traducao.interface";

describe('TraducaoService', () => {
  let service: TraducaoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TraducaoService]
    });
    service = TestBed.inject(TraducaoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve traduzir o texto corretamente', () => {
    const mockResponse: Traducao = {
      responseData: {
        translatedText: 'Texto traduzido',
        match: 1
      },
      responseStatus: 200
    };
    const texto = 'Texto a ser traduzido';
    const idiomaOriginal = 'pt';
    const idiomaFinal = 'en';

    service.translate(texto, idiomaOriginal, idiomaFinal).subscribe((response: Traducao): void => {
      expect(response.responseData.translatedText).toEqual('Texto traduzido');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?q=${encodeURIComponent(texto)}&langpair=${idiomaOriginal}|${idiomaFinal}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve retornar um erro ao traduzir o texto', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const texto = 'Texto a ser traduzido';
    const idiomaOriginal = 'pt';
    const idiomaFinal = 'en';

    service.translate(texto, idiomaOriginal, idiomaFinal).subscribe({
      next: () => {
        fail('Deveria retornar um erro');
      },
      error: (error) => {
        expect(error.message).toBe('Algo deu errado. Por favor, tente novamente mais tarde.');
      }
  });
    const req = httpMock.expectOne(`${service['apiUrl']}?q=${encodeURIComponent(texto)}&langpair=${idiomaOriginal}|${idiomaFinal}`);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    consoleErrorSpy.mockRestore();
  });
});
