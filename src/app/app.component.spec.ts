import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GamePlayService } from './services/game-play.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {
  let gamePlayServiceSpy: SpyObj<GamePlayService>

  beforeEach(async () => {
    gamePlayServiceSpy = createSpyObj('GamePlayService', ['playTheGame'])

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{provide: GamePlayService, useValue: gamePlayServiceSpy}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'swapi_app' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('swapi_app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, swapi_app');
  // });
});
