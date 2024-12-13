import { useState, useEffect, createContext, SetStateAction, useContext } from "react"
import { v4 as uuid } from "uuid"
import { getLetterScore } from "../reusableFunctions/letterScore"
import "../styles/letterCalculator.css"
import ResponseInterfaces from "../components/responseInterfaces"
import { LetterProperties } from "../reusableTypes/LetterProperties"

type ValidString = "true" | "false" | "start"

export type ContextType = {
    handleMultiply: (factor: number) => void
    handleReset: () => void
    totalWordScoreMultiplier: number
    wordToCheckArray: LetterProperties[]
    setWordToCheckArray: React.Dispatch<SetStateAction<LetterProperties[]>>
    totalWordScore: number;
}

export const Context = createContext<ContextType | null>(null)

export const useScrabbleContext = () : ContextType => {
    const context = useContext(Context);
    if (!context) {
        throw new Error ('useScrabbleContext must be available in Context')
    }
    return context
}

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
        handleReset()
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
                    data-test='word-form'
                    value={wordToCheck}
                    onChange={(e) => setWordToCheck(e.target.value)}
                    placeholder="scrabble"
                />
                <input type="submit" value="Check" data-test='submit-word-form-btn' className="form__input-button" />
            </form>

            <Context.Provider value={{
                handleMultiply,
                handleReset,
                totalWordScoreMultiplier,
                setWordToCheckArray,
                wordToCheckArray,
                totalWordScore
            }}>
                <ResponseInterfaces
                    isValidString={isValidString}
                    isValidWord={isValidWord}
                    isAnalysing={isAnalysing}
                />
            </Context.Provider>

        </main>
    )
}