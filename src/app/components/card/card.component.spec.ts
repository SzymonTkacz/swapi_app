import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { person1ResponseMock } from '../../tests/unit-tests/mocks/person-response.mock';
import { Person } from '../../models/person.model';
import { starship1ResponseMock } from '../../tests/unit-tests/mocks/starship-response.mock';
import { Starship } from '../../models/starship.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.cardData = {totalScore: 0}
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should check if Person data is assigned properly', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const app = fixture.componentInstance;
    app.playerNr = 1
    app.gameType = "PEOPLE"
    app.cardData = {
      totalScore: 0,
      properties: person1ResponseMock.result.properties as Person
    }
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#personName1").innerText).toContain("Jocasta Nu")
    expect(fixture.debugElement.nativeElement.querySelector("#mass1").innerText).toContain("55")
    expect(fixture.debugElement.nativeElement.querySelector("#birthYear1").innerText).toContain("unknown")
    expect(fixture.debugElement.nativeElement.querySelector("#personCreated1").innerText).toContain("Nov 23, 2024")
    expect(fixture.debugElement.nativeElement.querySelector("#personEdited1").innerText).toContain("Nov 23, 2024")
    expect(fixture.debugElement.nativeElement.querySelector("#eyeColor1").innerText).toContain("blue")
    expect(fixture.debugElement.nativeElement.querySelector("#gender1").innerText).toContain("female")
    expect(fixture.debugElement.nativeElement.querySelector("#hairColor1").innerText).toContain("white")
    expect(fixture.debugElement.nativeElement.querySelector("#height1").innerText).toContain("167")
    expect(fixture.debugElement.nativeElement.querySelector("#skinColor1").innerText).toContain("fair")
    expect(fixture.debugElement.nativeElement.querySelector("#score1").innerText).toContain("0")
  });

  it('should check if Starship data is assigned properly', () => {
    const fixture = TestBed.createComponent(CardComponent);
    const app = fixture.componentInstance;
    app.playerNr = 1
    app.gameType = "STARSHIPS"
    app.cardData = {
      totalScore: 5,
      properties: starship1ResponseMock.result.properties as Starship
    }
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("#shipName1").innerText).toContain("J-type diplomatic barge")
    expect(fixture.debugElement.nativeElement.querySelector("#crew1").innerText).toContain("5")
    expect(fixture.debugElement.nativeElement.querySelector("#model1").innerText).toContain("J-type diplomatic barge")
    expect(fixture.debugElement.nativeElement.querySelector("#mglt1").innerText).toContain("unknown")
    expect(fixture.debugElement.nativeElement.querySelector("#shipCreated1").innerText).toContain("Sep 17, 2020")
    expect(fixture.debugElement.nativeElement.querySelector("#shipEdited1").innerText).toContain("Sep 17, 2020")
    expect(fixture.debugElement.nativeElement.querySelector("#capacity1").innerText).toContain("unknown")
    expect(fixture.debugElement.nativeElement.querySelector("#consumables1").innerText).toContain("1 year")
    expect(fixture.debugElement.nativeElement.querySelector("#cost1").innerText).toContain("2000000")
    expect(fixture.debugElement.nativeElement.querySelector("#rating1").innerText).toContain("0.7")
    expect(fixture.debugElement.nativeElement.querySelector("#length1").innerText).toContain("39")
    expect(fixture.debugElement.nativeElement.querySelector("#manufacturer1").innerText).toContain("Theed Palace Space Ves...")
    expect(fixture.debugElement.nativeElement.querySelector("#speed1").innerText).toContain("2000")
    expect(fixture.debugElement.nativeElement.querySelector("#passengers1").innerText).toContain("10")
    expect(fixture.debugElement.nativeElement.querySelector("#score1").innerText).toContain("5")
  });
});
