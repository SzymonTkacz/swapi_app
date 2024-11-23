import { TestBed } from '@angular/core/testing';
import { GamePlayService } from './game-play.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { GameType } from '../models/game-type.model';
import { person1ResponseMock, person2ResponseMock } from '../tests/unit-tests/mocks/person-response.mock';
import { Person } from '../models/person.model';
import { starship1ResponseMock, starship2ResponseMock } from '../tests/unit-tests/mocks/starship-response.mock';
import { Starship } from '../models/starship.model';
import { CardData } from '../models/card-data.model';

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
    spyOn<any>(service, 'getCardsData')
    service.playTheGame(GameType.PEOPLE)
    
    const req = httpTestingController.expectOne(
      `${service['apiBase']}/${service['gameUrl']}?page=1&limit=100`
    )
    expect(req.request.method).toBe('GET')

    const peopleIdsArray = [{uid: '1'}, {uid: '2'}, {uid: '3'}, {uid: '4'}]
    req.flush({results: peopleIdsArray})    
    const idsArray: string[] = peopleIdsArray.map((item) => item['uid'])

    expect(idsArray).toContain(service['randomIds'][0])
    expect(idsArray).toContain(service['randomIds'][1])
    expect(service['getCardsData']).toHaveBeenCalled()
  });

  it('should make 2 requests and set cardData signal', () => {
    service['randomIds'] = ['1', '2']
    service['gameType'] = GameType.PEOPLE
    service['getCardsData']()

    const req1 = httpTestingController.expectOne(
      `${service['apiBase']}/${service['gameUrl']}/1`
    )
    const req2 = httpTestingController.expectOne(
      `${service['apiBase']}/${service['gameUrl']}/2`
    )
    req1.flush(person1ResponseMock)
    req2.flush(person2ResponseMock)

    expect(service.cardData()[0].properties).toBe(person1ResponseMock.result.properties as Person)
    expect(service.cardData()[0].numberToCompare).toBe(55)
    expect(service.cardData()[0].totalScore).toBe(0)

    expect(service.cardData()[1].properties).toBe(person2ResponseMock.result.properties as Person)
    expect(service.cardData()[1].numberToCompare).toBe(78.2)
    expect(service.cardData()[1].totalScore).toBe(1)
    expect(service.cardData()[1].isWinner).toBe(true)
  });
  
  it('should get 2 random ids from ids array', () => {
    const idsArray: string[] = ['1', '2', '3', '4', '5', '6', '7', '8']
    const getRandomIdsResult = service['getRandomIds'](idsArray)

    expect(idsArray).toContain(getRandomIdsResult[0])
    expect(idsArray).toContain(getRandomIdsResult[1])
  })

  it('should parse data from http request to CardData object even if the number to compare contains a comma', () => {
    service['gameType'] = GameType.STARSHIPS
    const parseCardPropertiesResult = service['parseCardProperties'](starship2ResponseMock.result.properties, 0)

    expect(parseCardPropertiesResult.properties).toBe(starship2ResponseMock.result.properties as Starship)
    expect(parseCardPropertiesResult.numberToCompare).toBe(47060)
    expect(parseCardPropertiesResult.totalScore).toBe(0)
  })

  it('should choose the winner from 2 CardData objects array', () => {
    service['gameType'] = GameType.STARSHIPS
    const card1 = service['parseCardProperties'](starship1ResponseMock.result.properties, 0)
    const card2 = service['parseCardProperties'](starship2ResponseMock.result.properties, 1)
    service['findWinner']([card1, card2])
    expect(card1.isWinner).toBe(undefined)
    expect(card2.isWinner).toBe(true)
  })

  it('should update the winner score from 2 CardData objects array', () => {
    service['gameType'] = GameType.STARSHIPS
    const card1 = service['parseCardProperties'](starship1ResponseMock.result.properties, 0)
    const card2 = service['parseCardProperties'](starship2ResponseMock.result.properties, 1)
    card2.isWinner = true
    service['updateScore']([card1, card2])
    expect(card1.totalScore).toBe(0)
    expect(card2.totalScore).toBe(1)
  })

  it('should reset cardData signal to initial value', () => {
    const card1 = service['parseCardProperties'](starship1ResponseMock.result.properties, 0)
    const card2 = service['parseCardProperties'](starship2ResponseMock.result.properties, 1)
    card2.isWinner = true
    service.cardData.set([card1, card2])
    
    const initialCardValue: CardData = {totalScore: 0}
    service.resetGame()
    expect(service.cardData()[0]).toEqual(initialCardValue)
    expect(service.cardData()[1]).toEqual(initialCardValue)
  })
});
