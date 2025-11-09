import { useState } from "react"
import "../styles/letterCalculator.css"
import { useCheckWordInDictionary } from "../hooks/useCheckWordInDictionary"
import StartScreen from "../components/responseInterfaces/startScreen"
import IsAnalysing from "../components/responseInterfaces/isAnalysing"
import UnknownWord from "../components/responseInterfaces/unknownWord"
import ValidWord from "../components/responseInterfaces/validWord"
import Error from "../components/responseInterfaces/isError"
import InvalidEntry from "../components/responseInterfaces/invalidEntry"
import HowToModal from "../components/howToModal"

type ValidString = "true" | "false" | "start"

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("")
    const [isValidString, setIsValidString] = useState<ValidString>("start")
    const [submitWord, setSubmitWord] = useState(false)
    const [isTooLong, setIsTooLong] = useState(false)
    const [isHowToModalOpen, setIsHowToModalOpen] = useState(false)
    const { isError, isAnalysing, isApiError, isSupabaseError, isValidWord } = useCheckWordInDictionary({ wordToCheck, submitWord, setSubmitWord })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if ((/^[A-Z]+$/i).test(wordToCheck) && wordToCheck.length <= 15) {
            setIsValidString("true")
            setIsTooLong(false)
            setSubmitWord(true)
            return
        }
        else if (!(/^[A-Z]+$/i).test(wordToCheck) && (wordToCheck.length <= 15)) {
            setIsValidString("false")
            setIsTooLong(false)
            return
        }
        setIsValidString("true")
        setIsTooLong(true)
        return
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="flex-centre-row">
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
                <input type="submit" value="Check" data-test='submit-word-form-btn' className="form__input-button" title='Submit word for check' />
                {isValidString !== 'start' && <button id='instructions-btn' onClick={() => setIsHowToModalOpen(true)} title='View instructions'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z">
                        </path>
                    </svg>
                </button>}
            </form>
            <HowToModal open={isHowToModalOpen} onClose={() => setIsHowToModalOpen(false)} />

            {isValidString === "start" && <StartScreen />}
            {isAnalysing && <IsAnalysing />}
            {(isValidString === "false" || isTooLong) && <InvalidEntry isTooLong={isTooLong} />}
            {isValidString === "true" && !isValidWord && !isError && !isTooLong && !isAnalysing && <UnknownWord />}
            {isValidString === "true" && !isValidWord && isError && !isAnalysing && <Error wordToCheck={wordToCheck} isApiError={isApiError} isSupabaseError={isSupabaseError} />}

            {isValidString === "true" && isValidWord && !isError && !isAnalysing && !isTooLong &&
                <ValidWord wordToCheck={wordToCheck} submitWord={submitWord} />
            }
        </main>
    )
}