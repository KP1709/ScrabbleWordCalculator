import Tile from "../components/tile"
import { LetterProperties } from "../reusableTypes/LetterProperties"
import { v4 as uuid } from "uuid"
import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"

type ResponseInterface = {
    isValidString: string,
    isValidWord: boolean
    handleTileClick: (id: string) => void,
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
        handleTileClick,
        handleMultiply,
        handleReset,
        totalWordScoreMultiplier,
        wordToCheckArray }
        : ResponseInterface) {

    if (isValidString === "start") return (<StartScreen />)
    else if (isAnalysing) return (<IsAnalysing />)
    else if (isValidString === "false") return (<InvalidEntry />)
    else if (isValidString === "true" && isValidWord === false) return (<UnknownWord />)

    return (
        <div className="flex-centre">
            <ul className="flex-centre">
                {wordToCheckArray.map(char =>
                    <li key={uuid()} className="flex-centre" >
                        <Tile
                            id={char.id}
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