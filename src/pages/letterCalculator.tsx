import { useState } from "react"
import "../styles/letterCalculator.css"
import { useCheckWordInDictionary } from "../hooks/useCheckWordInDictionary"
import StartScreen from "../components/responseInterfaces/startScreen"
import IsAnalysing from "../components/responseInterfaces/isAnalysing"
import UnknownWord from "../components/responseInterfaces/unknownWord"
import ValidWord from "../components/responseInterfaces/validWord"
import Error from "../components/responseInterfaces/isError"
import InvalidEntry from "../components/responseInterfaces/invalidEntry"

type ValidString = "true" | "false" | "start"

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("")
    const [isValidString, setIsValidString] = useState<ValidString>("start")
    const [submitWord, setSubmitWord] = useState(false)
    const [isTooLong, setIsTooLong] = useState(false)
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