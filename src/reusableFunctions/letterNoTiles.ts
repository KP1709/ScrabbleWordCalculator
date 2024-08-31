import {letters as letterLookupList} from "../letterLookup"

export function getLetterNoTiles(enteredLetter: string): number{
    const maxAmount: number | undefined = letterLookupList.get(enteredLetter.toUpperCase()).maxAmount
    return maxAmount
}