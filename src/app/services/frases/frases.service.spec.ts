import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FrasesService } from './frases.service';

describe('FrasesService', () => {
  let service: FrasesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FrasesService]
    });
    service = TestBed.inject(FrasesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve obter uma frase do dia corretamente', () => {
    const mockResponse = {
      frase: 'Frase do dia',
      autor: 'Autor da frase'
    };

    service.obterFraseDoDia().subscribe((response) => {
      expect(response.frase).toEqual(mockResponse.frase);
      expect(response.autor).toEqual(mockResponse.autor);
    });

    const req = httpMock.expectOne('/api/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve tratar erros corretamente ao obter a frase do dia', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    service.obterFraseDoDia().subscribe({
      next: () => {
        fail('Deveria retornar um erro');
      },
      error: (error) => {
        expect(error.message).toBe('Algo deu errado; por favor, tente novamente mais tarde.');
      }
    });
    const req = httpMock.expectOne('/api/random');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    consoleErrorSpy.mockRestore();
  })
});
