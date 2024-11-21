import { Person } from "./person.model"
import { Starship } from "./starship.model"

export interface CardData {
    isWinner?: boolean
    totalScore?: number
    properties?: Person | Starship | undefined
}