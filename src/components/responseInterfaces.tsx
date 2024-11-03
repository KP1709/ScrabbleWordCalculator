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
        handleTileClick={handleTileClick}
        />
    )
}