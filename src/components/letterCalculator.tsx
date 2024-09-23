import { useState, useEffect} from "react"
import { v4 as uuid } from "uuid"
import { getLetterScore } from "../reusableFunctions/letterScore"
import "../styles/letterCalculator.css"
import ResponseInterfaces from "./responseInterfaces"
import { LetterProperties } from "../reusableTypes/LetterProperties"

type ValidString = "true" | "false" | "start"

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("")
    const [wordUsed, setWordUsed] = useState("") // Saves word at submission
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false)
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])
    const [totalWordScore, setTotalWordScore] = useState(0)
    const [totalWordScoreMultiplier, setTotalWordScoreMultiplier] = useState(1)
    const [isValidString, setIsValidString] = useState<ValidString>("start") // Regex check
    const [isValidWord, setIsValidWord] = useState<boolean>(false) // Word lookup check

    useEffect(() => {
        /** Check to see if word is in dictionary */
        async function checkWord() {
            if (wordUsed === "") return null
            setIsAnalysing(true)
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordUsed}`)
                const data = await res.json()
                if (Array.isArray(data)) setIsValidWord(true)
                else setIsValidWord(false)
            }
            catch (err) { setIsValidWord(false) }
            setIsAnalysing(false)
        }
        checkWord()
    }, [wordUsed])

    useEffect(() => {
        /** Updates total if word changes or word multiplier changes */
        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0)
        setTotalWordScore(newTotal * totalWordScoreMultiplier)
    }, [wordToCheckArray, totalWordScoreMultiplier])

    /** Handles word submitted in form */
    const handleSubmit = (e: { preventDefault: () => void }): void => {
        setWordToCheckArray([])
        e.preventDefault();
        { validation(wordToCheck) ? lookupLettersFromWord(wordToCheck) : setIsValidString("false") }
        setWordToCheck("")      
    }

    // Code produced by V0 but has been modified to work with original code written
    /** Handles multiplying letter score on tile */
    const handleTileClick = (id: string) => {
        setWordToCheckArray(prevValues => prevValues.map((tile) => {
            if (tile.id === id) {
                switch (tile.action) {
                    case 'double':
                        return { ...tile, score: tile.originalScore * 2, action: 'triple', colour: '#90e0ef' };
                    case 'triple':
                        return { ...tile, score: tile.originalScore * 3, action: 'restore', colour: '#0077b6' };
                    case 'restore':
                        return { ...tile, score: tile.originalScore, action: 'double', colour: '#ffffff' };
                }
            }
            return tile
        }))
    }

    /** Divides word into letters and looks up letter to get and store required information */
    const lookupLettersFromWord = (wordToCheck: string) => {
        const splitWordArray: string[] | void = wordToCheck.split("")

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

    const validation = (wordToCheck: string): boolean => {
        const regex = /^[A-Z]+$/i
        if (wordToCheck.match(regex)) {
            setIsValidString("true")
            setWordUsed(wordToCheck)
            return true
        }
        else return false
    }

    // Used to multiply word score by a factor
    const handleMultiply = (factor: number) => {
        setTotalWordScoreMultiplier(prevMultiplier => prevMultiplier * factor)
    }

    // Reset multiplied score to original score
    const handleReset = () => {
        setTotalWordScoreMultiplier(1)
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
                <input type="submit" value="Check" className="form__input-button" />
            </form>

            <ResponseInterfaces 
            isValidString={isValidString} 
            isValidWord={isValidWord} 
            handleTileClick={handleTileClick} 
            handleMultiply={handleMultiply} 
            handleReset={handleReset} 
            totalWordScore={totalWordScore} 
            isAnalysing={isAnalysing} 
            totalWordScoreMultiplier={totalWordScoreMultiplier}
            wordToCheckArray={wordToCheckArray}/>
        </main>
    )
}