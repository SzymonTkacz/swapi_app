import { TestBed } from '@angular/core/testing';

import { GamePlayService } from './game-play.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('GamePlayService', () => {
  let service: GamePlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
     ]
    });
    service = TestBed.inject(GamePlayService);
  });

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     providers: [GamePlayService]
  //   })
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
