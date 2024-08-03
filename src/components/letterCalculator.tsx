import { useState, useEffect} from "react"
import { v4 as uuid } from "uuid"

import { getLetterScore } from "../reusableFunctions/letterScore"
import Tile from "../components/tile"
import "../styles/letterCalculator.css"

type LetterProperties = {
    id: string,
    letter: string,
    score: number
}

// Union Type - three keywords allowed to be used
type validString = "true" | "false" | "start"

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("")
    const [wordUsed, setWordUsed] = useState("") // Saves word at submission

    const [isAnalysing, setIsAnalysing] = useState<boolean>(false)

    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])
    const [wordScoreArray, setWordScoreArray] = useState<number[]>([])

    const [isValidString, setIsValidString] = useState<validString>("start") // Regex check
    const [isValidWord, setIsValidWord] = useState<boolean>(false) // Word lookup check

    useEffect(() => {
        async function checkWord() {
            setIsAnalysing(true)
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordUsed}`)
                const data = await res.json()

                // if ok 200 - data is returned as array 
                if (Array.isArray(data)) {
                    setIsValidWord(true)
                }

                // if error 404 - data returned as object
                else {
                    setIsValidWord(false)
                }
            }
            catch (err) {
                setIsValidWord(false)
            }
            setIsAnalysing(false)
        }
        checkWord()
    }, [wordUsed])

    const handleSubmit = (e: { preventDefault: () => void }): void => {
        setWordToCheckArray([]) // Clear array before adding new characters
        setWordScoreArray([]) // Clear array before adding new numbers
        e.preventDefault();
        { validation(wordToCheck) ? separateLetters(wordToCheck) : setIsValidString("false") }

        setWordToCheck("") // Clear input after submission regardless        
    }

    // Divide string into items in array
    const separateLetters = (wordToCheck: string) => {
        const splitWordArray: string[] | void = wordToCheck.split("") // Split by no space

        // Insert object into array for each letter in word
        splitWordArray.forEach(item => {
            let newLetter: LetterProperties = {
                id: uuid(),
                letter: item.toUpperCase(),
                score: getLetterScore(item)
            }

            // Preserving previous letters/letter score when adding to array
            setWordToCheckArray(prevLetters => [...prevLetters, newLetter])
            setWordScoreArray(prevLetterScores => [newLetter.score, ...prevLetterScores])
        })
    }

    // Validating input using regex
    const validation = (wordToCheck: string): boolean => {
        const regex = /^[A-Z]+$/i
        if (wordToCheck.match(regex)) {
            setIsValidString("true")
            setWordUsed(wordToCheck)
            return true
        }
        else return false
    }

    const screenOutput = (isValidString: string, isValidWord: boolean) => {
        if (isValidString === "start") {
            return (
                <div className="flex-centre">
                    <h2>Enter a word to calculate score</h2>
                </div>
            )
        }

        else if (isAnalysing){
            return (
                <div className="flex-centre">
                    <h2>Analysing...</h2>
                </div>
            )
        }

        else if (isValidString === "false") {
            return (
                <div className="flex-centre">
                    <h2>Invalid Entry</h2>
                </div>
            )
        }

        else if (isValidString === "true" && isValidWord === false) {
            return (
                <div className="flex-centre">
                    <h2>Unknown Word</h2>
                </div>
            )
        }

        else {
            return (
                <div className="flex-centre">
                    <ul className="flex-centre">
                        {wordToCheckArray.map(char =>
                            <li key={uuid()} className="flex-centre" >
                                <Tile letter={char.letter} score={char.score} />
                            </li>
                        )}
                    </ul>

                    <h3 id="score"> Total : {
                        // Calculate word score and display
                        wordScoreArray.reduce((a, v) => a = a + v, 0)
                    }</h3>

                </div>
            )
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="flex-centre">
                <label htmlFor="word">Word:</label>
                <input type="text"
                    className="form__input-text"
                    name="word"
                    id="word"
                    value={wordToCheck}
                    onChange={(e) => setWordToCheck(e.target.value)}
                    placeholder="scrabble"
                />
                <input type="submit" value="Check" className="form__input-button"/>
            </form>

            {screenOutput(isValidString, isValidWord)}

        </main>
    )
}