import { useState, useEffect} from "react"
import { v4 as uuid } from "uuid"
import { getLetterScore } from "../reusableFunctions/letterScore"
import "../styles/letterCalculator.css"
import ResponseInterfaces from "./responseInterfaces"
import { LetterProperties } from "../reusableTypes/LetterProperties"

// Union Type - three keywords allowed to be used
type validString = "true" | "false" | "start"

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("")
    const [wordUsed, setWordUsed] = useState("") // Saves word at submission
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false)
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])
    const [totalWordScore, setTotalWordScore] = useState(0)
    const [totalWordScoreMultiplier, setTotalWordScoreMultiplier] = useState(1)
    const [isValidString, setIsValidString] = useState<validString>("start") // Regex check
    const [isValidWord, setIsValidWord] = useState<boolean>(false) // Word lookup check

    useEffect(() => {
        async function checkWord() {
            if (wordUsed === "") return null
            setIsAnalysing(true)
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordUsed}`)
                const data = await res.json()

                // if ok 200 - data is returned as array 
                if (Array.isArray(data)) setIsValidWord(true)
                // if error 404 - data returned as object
                else setIsValidWord(false)
            }
            catch (err) { setIsValidWord(false) }
            setIsAnalysing(false)
        }
        checkWord()
    }, [wordUsed])

    useEffect(() => {
        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0)
        setTotalWordScore(newTotal * totalWordScoreMultiplier)
    }, [wordToCheckArray, totalWordScoreMultiplier])

    const handleSubmit = (e: { preventDefault: () => void }): void => {
        setWordToCheckArray([]) // Clear array before adding new characters
        e.preventDefault();
        { validation(wordToCheck) ? lookupLettersFromWord(wordToCheck) : setIsValidString("false") }
        setWordToCheck("") // Clear input after submission regardless        
    }

    /** Code produced by V0 but has been modified to suit original code */
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

    // Divide string into items in array
    const lookupLettersFromWord = (wordToCheck: string) => {
        const splitWordArray: string[] | void = wordToCheck.split("") // Split by no space

        // Insert object into array for each letter in word
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

    const handleMultiply = (factor: number) => {
        setTotalWordScoreMultiplier(prevMultiplier => prevMultiplier * factor)
    }

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