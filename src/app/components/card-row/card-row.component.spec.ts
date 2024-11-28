import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRowComponent } from './card-row.component';

describe('CardRowComponent', () => {
  let component: CardRowComponent;
  let fixture: ComponentFixture<CardRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check if row data is assigned properly', () => {
    const fixture = TestBed.createComponent(CardRowComponent);
    const app = fixture.componentInstance;
    app.testId = "personName1"
    app.label = "Name"
    app.value = "Jocasta Nu"
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#personName1").innerText).toContain("Jocasta Nu")
    expect(fixture.debugElement.nativeElement.querySelector(".label").innerText).toContain("Name")
  });

  it('should check if progress bar appears', () => {
    const fixture = TestBed.createComponent(CardRowComponent);
    const app = fixture.componentInstance;
    app.loading = true
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#loader")).toBeTruthy()
  });
});
