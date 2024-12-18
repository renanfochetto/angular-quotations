import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { FotoService } from './foto.service';

describe('FotoService', () => {
  let service: FotoService;
  let httpMock: HttpTestingController;
  const apiUrl = `https://api.unsplash.com/photos/random?query=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;

  const mockPhotoResponse = {
    urls: {
      regular: 'https://example.com/image.jpg'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FotoService]
    });
    service = TestBed.inject(FotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar uma foto', async () => {
    service.getFoto().subscribe((photo) => {
      expect(photo).toEqual(mockPhotoResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotoResponse);
  });

  it('deve retornar um erro ao obter uma foto', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    service.getFoto().subscribe({
      next: () => fail('Deveria retornar um erro 404'),
      error: (error) => {
        expect(error.message).toBe('Algo deu errado. Por favor, tente novamente mais tarde.');
      }
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    consoleErrorSpy.mockRestore();
  });
});
