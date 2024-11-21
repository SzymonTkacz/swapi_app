import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card'
import { GamePlayService } from './services/game-play.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { gameData } from './consts/game-data.const';
import { GameType } from './models/game-type.model';
import { CardData } from './models/card-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, CardComponent,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'swapi_app';
  dropdownData = gameData
  gameTypes = GameType
  gameType: string = this.gameTypes[gameData[0].type]
  loading = signal<boolean>(false)
  cardData = signal<CardData[]>([])
  // loading = signal<boolean>(false)
  constructor(private gamePlayService: GamePlayService) {
    this.cardData = this.gamePlayService.cardData
    this.loading = this.gamePlayService.loading
  }

  changeGameType(type: MatSelectChange) {
    this.gameType = type.value
    this.resetGame()
  }

  playTheGame() {
    this.gamePlayService.playTheGame(GameType[this.gameType as keyof typeof GameType])
  }

  resetGame() {
    this.gamePlayService.resetGame()
  }
}
