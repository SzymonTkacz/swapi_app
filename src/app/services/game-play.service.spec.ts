import { TestBed } from '@angular/core/testing';
import { GamePlayService } from './game-play.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GameType } from '../models/game-type.model';

describe('GamePlayService', () => {
  let service: GamePlayService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
     ]
    });
    service = TestBed.inject(GamePlayService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a request, get 2 random ids and call getCardsData()', () => {
    spyOn(service, 'getCardsData')
    service.playTheGame(GameType.PEOPLE)
    
    const req = httpTestingController.expectOne(
      `${service.apiBase}/${service.gameUrl}?page=1&limit=100`
    )
    expect(req.request.method).toBe('GET')

    const peopleIdsArray = [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}]
    req.flush({results: peopleIdsArray})
    
    const idsArray: string[] = peopleIdsArray.map((item) => item['uid'])
    expect(idsArray).toContain(service.randomIds[0])
    expect(idsArray).toContain(service.randomIds[1])
    expect(service.getCardsData).toHaveBeenCalled()
  });  
});
