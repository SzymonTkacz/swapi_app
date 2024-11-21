import { GameType } from "./game-type.model"
import { Person } from "./person.model"
import { Starship } from "./starship.model"

export interface CardData {
    type?: GameType
    isWinner?: boolean
    numberToCompare?: number
    totalScore: number
    properties?: Person | Starship | undefined
}