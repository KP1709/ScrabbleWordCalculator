import { LetterProperties } from "../reusableTypes/LetterProperties"
import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"
import ValidWord from "./responseInterfaces/validWord"

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
        <ValidWord 
        totalWordScore={totalWordScore}
        handleMultiply={handleMultiply}
        handleReset={handleReset}
        totalWordScoreMultiplier={totalWordScoreMultiplier}
        wordToCheckArray={wordToCheckArray}
        setWordToCheckArray={setWordToCheckArray}
        />
    )
}