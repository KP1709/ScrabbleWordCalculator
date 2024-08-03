import {letters} from "../letterLookup"

export function getLetterNoTiles(enteredLetter: String): number{
    const usedLetter = enteredLetter.toUpperCase()
    const output = (letters.filter(item => item.letter === usedLetter))
    const maxAmount:number = output[0].maxAmount
    return maxAmount
}