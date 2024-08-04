import {letters} from "../letterLookup"

export function getLetterScore(enteredLetter: string): number{
    const usedLetter = enteredLetter.toUpperCase()
    const output = letters.filter(item => item.letter === usedLetter)
    const tileScore: number = output[0].score
    return tileScore
}