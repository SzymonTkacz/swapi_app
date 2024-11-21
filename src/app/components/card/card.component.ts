import { Component, Input, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameType } from '../../models/game-type.model';
import { CardData } from '../../models/card-data.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  gameTypes = GameType
  @Input() playerNumber: number = 0
  @Input() gameType!: string
  @Input() cardData: CardData | undefined = undefined

}
