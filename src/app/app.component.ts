import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, CardComponent,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  providers: [GamePlayService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private gamePlayService = inject(GamePlayService)
  public dropdownData = gameData
  public gameTypes = GameType
  public gameType: string = this.gameTypes[gameData[0].type]
  public cardData = this.gamePlayService.cardData
  public loading = this.gamePlayService.loading

  public changeGameType(type: MatSelectChange) {
    this.gameType = type.value
    this.resetGame()
  }

  public playTheGame() {
    this.gamePlayService.playTheGame(GameType[this.gameType as keyof typeof GameType])
  }

  public resetGame() {
    this.gamePlayService.resetGame()
  }
}
