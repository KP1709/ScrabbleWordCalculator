import {letters as letterLookupList} from "../letterLookup"

export function getLetterScore(enteredLetter: string): number{
    const tileScore: number | undefined = letterLookupList.get(enteredLetter.toUpperCase()).score
    return tileScore
}