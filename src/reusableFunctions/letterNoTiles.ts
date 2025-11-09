import { letters } from "../letterLookup"

export function getLetterNoTiles(enteredLetter: string): number {
    const usedLetter = enteredLetter.toUpperCase()
    const maxNumberOfLetters: number = letters.filter(item => item.letter === usedLetter)[0].maxAmount
    return maxNumberOfLetters
}