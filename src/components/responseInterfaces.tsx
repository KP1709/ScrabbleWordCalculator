import { LetterProperties } from "../reusableTypes/LetterProperties"
import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"
import Word from "./word"
import { ValidString } from "../reusableTypes/ValidStringEnum"

type ResponseInterface = {
    isValidString: string,
    isValidWord: boolean
    handleMultiply: (factor: number) => void,
    handleReset: () => void,
    totalWordScore: number,
    isAnalysing: boolean,
    totalWordScoreMultiplier: number,
    wordToCheckArray: LetterProperties[]
}

export default function ResponseInterfaces(
    { isValidString,
        isAnalysing,
        isValidWord,
        totalWordScore,
        handleMultiply,
        handleReset,
        totalWordScoreMultiplier,
        wordToCheckArray }
        : ResponseInterface) {


    if (isValidString === ValidString.startScreen) return (<StartScreen />)
    else if (isAnalysing) return (<IsAnalysing />)
    else if (isValidString === ValidString.false) return (<InvalidEntry />)
    else if (isValidString === ValidString.false && isValidWord === false) return (<UnknownWord />)

    return (
        <div className="flex-centre" data-test="valid-input-screen">
            <Word
                wordToCheckArray={wordToCheckArray}
                handleMultiply={handleMultiply}
                handleReset={handleReset}
            />
            <h3 id="score"> Total : {totalWordScore}</h3>

            <div id="multiplier__buttons" className="flex-centre">
                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(2)}
                        data-test="double-multiplier-button">
                        Double total score
                    </button>}

                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(3)}
                        data-test="triple-multiplier-button">
                        Triple total score
                    </button>}

                {totalWordScoreMultiplier !== 1 &&
                    <button className="multiplier__button"
                        onClick={handleReset}
                        data-test="reset-multiplier-button">
                        Reset score multiplier
                    </button>}
            </div>
        </div>
    )
}