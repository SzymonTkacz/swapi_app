import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  gameTypes = GameType
  numbersToCompare: number[] = []
  gameType: GameType | undefined = undefined

  constructor(private http: HttpClient) { }

  playTheGame(type: GameType) {
    this.gameType = type
    this.gameUrl = gameData.filter(x => x.type === type)[0].url
    return this.http.get(`${this.apiBase}/${this.gameUrl}?page=1&limit=100`).pipe(take(1)).subscribe({
      next: (data: any) => {
        const ids: string[] = []
        const items: [any] = data.results
        items?.forEach(item => {
          ids.push(item.uid)
        })
        this.randomIds = this.getRandomIds(ids)
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
    const reducedIds = ids.filter(x => x != ids[id1])
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
    ]).subscribe(([data1, data2]) => {
      const dataArray: any[] = [data1.result.properties, data2.result.properties]
      const cardDataArray: CardData[] = []

      dataArray.forEach(item => {
        // let cardData: CardData = {}
        // if(gameType) {
        //   cardData.properties = item as Person
        // } else {
        //   cardData.properties = item as Starship
        // }
        //let x = typeof(Starship)
        //cardDataArray.push(cardData)
      })

      // if(isPersonData) {

      // }
      console.log(data1)
      console.log(data2)
    
      // make your last http request here.
    });
  }

  parseCardProperties(item: any): Person | Starship |undefined {
    if(this.gameType === this.gameTypes.PEOPLE) {
      this.numbersToCompare.push(Number(item.mass))
      return item as Person
    }
    if(this.gameType === this.gameTypes.STARSHIPS) {
      this.numbersToCompare.push(Number(item.mass))
      return item as Starship
    }
    return undefined
  }

  getWinnerIndex(array: string[]) {

  }

  resetGame() {

  }
}

// interface forComparison {
//   numbers: number

// }
type ObjectType<T> = 
    T extends "circle" ? Person :
    T extends "square" ? Starship :
    never;
