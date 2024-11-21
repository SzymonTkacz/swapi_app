import { GameData } from "../models/game-data.model";
import { GameType } from "../models/game-type.model";

export const gameData: GameData[] = [
    {type: GameType.PEOPLE, label: "People", url: "people"},
    {type: GameType.STARSHIPS, label: "Starships", url: "starships"}
]
