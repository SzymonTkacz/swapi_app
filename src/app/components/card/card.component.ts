import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameType } from '../../models/game-type.model';
import { CardData } from '../../models/card-data.model';
import { CardRowComponent } from '../card-row/card-row.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CardRowComponent, DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  gameTypes = GameType
  @Input() playerNumber: number = 0
  @Input() gameType!: string
  @Input() cardData!: CardData
  @Input() loading: boolean = false

  getProperties() {
    return [this.cardData.properties]
  }

}
