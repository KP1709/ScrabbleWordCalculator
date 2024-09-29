import { LetterProperties } from "../reusableTypes/LetterProperties"
import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"
import Word from "./word"
import { HandleTileClickContext, HandleTileClickContextType } from "./letterCalculator"
import { useContext } from "react"

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

    const { handleTileClick } = useContext(HandleTileClickContext) as HandleTileClickContextType

    if (isValidString === "start") return (<StartScreen />)
    else if (isAnalysing) return (<IsAnalysing />)
    else if (isValidString === "false") return (<InvalidEntry />)
    else if (isValidString === "true" && isValidWord === false) return (<UnknownWord />)

    return (
        <div className="flex-centre">
            <Word
                wordToCheckArray={wordToCheckArray}
                handleTileClick={handleTileClick}
                handleMultiply={handleMultiply}
                handleReset={handleReset}
            />
            <h3 id="score"> Total : {totalWordScore}</h3>

            <div id="multiplier__buttons" className="flex-centre">
                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(2)}>
                        Double total score
                    </button>}

                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(3)}>
                        Triple total score
                    </button>}

                {totalWordScoreMultiplier !== 1 &&
                    <button className="multiplier__button"
                        onClick={handleReset}>
                        Reset score multiplier
                    </button>}
            </div>
        </div>
    )
}