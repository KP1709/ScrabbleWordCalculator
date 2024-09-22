import { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"

import { getLetterScore } from "../reusableFunctions/letterScore"
import Tile from "../components/tile"
import "../styles/letterCalculator.css"
import HowToModal from "../components/howToModal"

type LetterProperties = {
    id: string,
    letter: string,
    score: number,
    originalScore: number,
    action: 'double' | 'triple' | 'restore',
    colour: '#90e0ef'| '#0077b6'| '#ffffff'
}

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
    const [isOpen, setIsOpen] = useState(false)

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

    const responseInterfaces = (isValidString: string, isValidWord: boolean) => {
        if (isValidString === "start") {
            return (
                <div className="flex-centre">
                    <h2>Enter a word to calculate score</h2>
                    <div>
                        <button className="start__instructions-button" onClick={() => setIsOpen(true)}>View instructions here</button>
                        <HowToModal open={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
                </div>
            )
        }

        else if (isAnalysing) {
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
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>
                </div>
            )
        }

        else if (isValidString === "true" && isValidWord === false) {
            return (
                <div className="flex-centre">
                    <h2>Unknown Word</h2>
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
                </div>
            )
        }

        else {
            return (
                <div className="flex-centre">
                    <ul className="flex-centre">
                        {wordToCheckArray.map(char =>
                            <li key={uuid()} className="flex-centre" >
                                <Tile id={char.id}
                                    letter={char.letter}
                                    score={char.score}
                                    onClick={() => handleTileClick(char.id)}
                                    action={char.action}
                                    colour={char.colour}
                                />
                            </li>
                        )}
                    </ul>
                    <h3 id="score"> Total : {totalWordScore}</h3>
                    <div id="multiplier__buttons" className="flex-centre">
                        {totalWordScoreMultiplier === 1 && <button className="multiplier__button" onClick={() => handleMultiply(2)}>
                            Double total score
                        </button>}
                        {totalWordScoreMultiplier === 1 && <button className="multiplier__button" onClick={() => handleMultiply(3)}>
                            Triple total score
                        </button>}
                        {totalWordScoreMultiplier !== 1 && <button className="multiplier__button" onClick={handleReset}>
                            Reset score multiplier
                        </button>}
                    </div>
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
                <input type="submit" value="Check" className="form__input-button" />
            </form>

            {responseInterfaces(isValidString, isValidWord)}

        </main>
    )
}