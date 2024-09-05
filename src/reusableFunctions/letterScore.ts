import {letters} from "../letterLookup"

export function getLetterScore(enteredLetter: string): number{
    const usedLetter = enteredLetter.toUpperCase()
    const tileScore: number = letters.filter(item => item.letter === usedLetter)[0].score
    return tileScore
}