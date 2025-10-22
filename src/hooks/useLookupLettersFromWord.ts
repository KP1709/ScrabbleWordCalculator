import { useEffect, useState } from "react"
import { LetterProperties } from "../reusableTypes/LetterProperties"
import { getLetterScore } from "../reusableFunctions/letterScore"
import { v4 as uuid } from "uuid"

export const useLookupLettersFromWord = (wordToCheck: string, submitWord: boolean) => {
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])

    useEffect(() => {
        const splitWordArray: string[] | void = wordToCheck.split("")
        if (submitWord) {
            splitWordArray.forEach(item => {
                let newLetter: LetterProperties = {
                    id: uuid(),
                    letter: item.toUpperCase(),
                    originalScore: getLetterScore(item), // Required to use for triple + doubling
                    score: getLetterScore(item),
                    action: 'restore',
                    colour: '#ffffff'
                }
                setWordToCheckArray(prevLetters => [...prevLetters, newLetter])
            })
        }

    }, [submitWord])
    return { wordToCheckArray, setWordToCheckArray }
}