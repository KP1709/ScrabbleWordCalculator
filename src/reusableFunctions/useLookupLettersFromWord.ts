import { LetterProperties } from "../reusableTypes/LetterProperties"
import { getLetterScore } from "./letterScore"

export const useLookupLettersFromWord = (wordToCheck: string) => {
    const wordLetterProperties = <LetterProperties[]>[]
    const splitWordArray = wordToCheck.split("")

    splitWordArray.forEach((item, index) => {
        let newLetter: LetterProperties = {
            id: String(index),
            letter: item.toUpperCase(),
            originalScore: getLetterScore(item), // Required to use for triple + doubling
            score: getLetterScore(item),
            action: 'restore',
            colour: 'restore-tile-colour'
        }
        wordLetterProperties.push(...[newLetter])
    })

    return wordLetterProperties
}

