import { LetterProperties } from "../reusableTypes/LetterProperties"
import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"
import Word from "./word"
import ScoreModifier from "./scoreModifier"

type ResponseInterface = {
    isValidString: string,
    isValidWord: boolean
    handleMultiply: (factor: number) => void,
    handleReset: () => void,
    totalWordScore: number,
    isAnalysing: boolean,
    totalWordScoreMultiplier: number,
    wordToCheckArray: LetterProperties[],
    setWordToCheckArray: React.Dispatch<React.SetStateAction<LetterProperties[]>>
}

export default function ResponseInterfaces(
    { isValidString,
        isAnalysing,
        isValidWord,
        totalWordScore,
        handleMultiply,
        handleReset,
        totalWordScoreMultiplier,
        wordToCheckArray,
        setWordToCheckArray }
        : ResponseInterface) {


    if (isValidString === "start") return (<StartScreen />)
    else if (isAnalysing) return (<IsAnalysing />)
    else if (isValidString === "false") return (<InvalidEntry />)
    else if (isValidString === "true" && isValidWord === false) return (<UnknownWord />)

    return (
        <div className="flex-centre">
            <Word
                wordToCheckArray={wordToCheckArray}
                setWordToCheckArray={setWordToCheckArray}
            />

            <h3 id="score"> Total : {totalWordScore}</h3>

            <ScoreModifier
                handleMultiply={handleMultiply}
                handleReset={handleReset}
                totalWordScoreMultiplier={totalWordScoreMultiplier}
            />
        </div>
    )
}