import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameType } from '../../models/game-type.model';
import { CardData } from '../../models/card-data.model';
import { CardRowComponent } from '../card-row/card-row.component';
import { DatePipe } from '@angular/common';
import { Person } from '../../models/person.model';
import { Starship } from '../../models/starship.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CardRowComponent, DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  gameTypes = GameType
  @Input() playerNr: number = 0
  @Input() gameType!: string
  @Input() cardData!: CardData
  @Input() loading: boolean = false

  getPersonProperties() {
    return [this.cardData.properties as Person]
  }

  getStarshipProperties() {
    return [this.cardData.properties as Starship]
  }

}
