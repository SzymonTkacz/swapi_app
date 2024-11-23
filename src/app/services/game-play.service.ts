import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { Starship } from '../models/starship.model';
import { Person } from '../models/person.model';
import { CardData } from '../models/card-data.model';
import { gameData } from '../consts/game-data.const';
import { GameType } from '../models/game-type.model';

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {
  apiBase = "https://www.swapi.tech/api"
  randomIds: string[] = []
  gameUrl: string = ""
  gameType: GameType | undefined = undefined
  cardDataInitialValues: CardData[] = [{totalScore: 0}, {totalScore: 0}]
  cardData = signal<CardData[]>(this.cardDataInitialValues)
  loading = signal<boolean>(false)

  constructor(private http: HttpClient) { }

  playTheGame(type: GameType) {
    this.loading.set(true)
    this.gameType = type
    this.gameUrl = gameData.filter(x => x.type === type)[0].url
    this.http.get<any>(`${this.apiBase}/${this.gameUrl}?page=1&limit=100`).pipe(take(1)).subscribe({
      next: (data) => {
        const ids: string[] = []
        const items: [any] = data.results
        items?.forEach(item => {
          ids.push(item.uid)
        })
        this.randomIds = this.getRandomIds(ids)
      },
      error: (err) => {
        console.log(err)
        this.loading.set(false)
      },
      complete: () => {
        this.getCardsData()
      }
    })
  }

  getRandomIds(ids: string[]): string[] {
    if(ids.length < 2) {
      return []
    }
    const id1 = Math.floor(Math.random() * ids.length);
    const reducedIds = ids.filter(x => x !== ids[id1])
    const id2 = Math.floor(Math.random() * reducedIds.length);

    return [ids[id1], reducedIds[id2]]
  }

  getCardsData() {
    if(this.randomIds.length != 2) {
      return
    }
    forkJoin([
      this.http.get<any>(`${this.apiBase}/${this.gameUrl}/${this.randomIds[0]}`),
      this.http.get<any>(`${this.apiBase}/${this.gameUrl}/${this.randomIds[1]}`),
    ])
    .subscribe({
        next: ([data1, data2]) => {
          const dataArray: any[] = [data1.result.properties, data2.result.properties]
          const cardDataArray: CardData[] = []

          dataArray.forEach((item, index) => {
            cardDataArray.push(this.parseCardProperties(item, index))
          })

          this.findWinner(cardDataArray)
          this.updateScore(cardDataArray)
          this.cardData.set(cardDataArray)
        },
        error: (err) => {
          console.log(err)
          this.cardData.set([
            {...this.cardData()[0], properties: undefined, isWinner: undefined},
            {...this.cardData()[1], properties: undefined, isWinner: undefined},
          ])          
          this.loading.set(false)
        },
        complete: () => {
          this.loading.set(false)
        }
      });
  }

  parseCardProperties(item: any, index: number): CardData {
    const cardDataItem: CardData = {totalScore: this.cardData()[index].totalScore}
    switch(this.gameType) {
      case GameType.PEOPLE: {
        cardDataItem.numberToCompare = Number(item.mass?.replace(/,/g, ''))
        cardDataItem.properties = item as Person
        break
      }
      case GameType.STARSHIPS: {
        cardDataItem.numberToCompare = Number(item.crew?.replace(/,/g, ''))
        cardDataItem.properties = item as Starship
        break
      }
      default: { 
        cardDataItem.properties = undefined
        break; 
     } 
    }
    return cardDataItem
  }

  findWinner(cards: CardData[]) {
    if(cards.length != 2) {
      return
    }
    if(!cards[0].numberToCompare || !cards[1].numberToCompare) {
      return
    }

    if(cards[0].numberToCompare > cards[1].numberToCompare) {
      cards[0].isWinner = true
    }
    else if(cards[0].numberToCompare < cards[1].numberToCompare) {
      cards[1].isWinner = true
    }
  }

  updateScore(cards: CardData[]) {
    const winner = cards.find(x => x.isWinner)
    if(!winner) {
      return
    } else {
      winner.totalScore += 1
    }
  }

  resetGame() {
    this.cardData.set(this.cardDataInitialValues)
  }
}
