import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailApiService } from './cocktail-api.service';

describe('CocktailApiService', () => {
  let service: CocktailApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CocktailApiService]
    });
    service = TestBed.inject(CocktailApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  //requires public api endpoint
  it('should retrieve a random cocktail', () => {
    const mockCocktail = { drinks: [{ idDrink: '11007', strDrink: 'Margarita' }] };
  
    service.getrandomData().subscribe(cocktails => {
      expect(cocktails[0].drinks.idDrink).toEqual('11007');
    });
  
    const req = httpMock.expectOne(service.random);
    expect(req.request.method).toBe('GET');
    req.flush(mockCocktail);
  });
});