import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should click Play button and call playTheGame method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'playTheGame');  
    let button = fixture.debugElement.nativeElement.querySelector('button[data-test-id="playButton"]');
    button.click();
    
    expect(app.playTheGame).toHaveBeenCalled();
  });

  it('should click Reset button and call resetGame method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'resetGame');  
    let button = fixture.debugElement.nativeElement.querySelector('button[data-test-id="resetButton"]');
    button.click();
    
    expect(app.resetGame).toHaveBeenCalled();
  });
});
