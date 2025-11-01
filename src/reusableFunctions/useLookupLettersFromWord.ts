import { LetterProperties } from "../reusableTypes/LetterProperties"
import { getLetterScore } from "./letterScore"
import { v4 as uuid } from "uuid"

export const useLookupLettersFromWord = (wordToCheck: string) => {
    const wordLetterProperties = <LetterProperties[]>[]
    const splitWordArray = wordToCheck.split("")

    splitWordArray.forEach(item => {
        let newLetter: LetterProperties = {
            id: uuid(),
            letter: item.toUpperCase(),
            originalScore: getLetterScore(item), // Required to use for triple + doubling
            score: getLetterScore(item),
            action: 'restore',
            colour: '#ffffff'
        }
        wordLetterProperties.push(...[newLetter])
    })

    return wordLetterProperties
}

