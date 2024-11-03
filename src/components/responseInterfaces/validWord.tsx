import { LetterProperties } from "../../reusableTypes/LetterProperties"
import Word from "../word"

type ValidWordType = {
    totalWordScore: number,
    handleMultiply: (factor: number) => void,
    handleReset: () => void
    totalWordScoreMultiplier: number
    wordToCheckArray: LetterProperties[]
    handleTileClick: (id: string) => void
}

export default function ValidWord({ ...props }: ValidWordType) {
    const { wordToCheckArray, handleTileClick, handleMultiply, totalWordScoreMultiplier, totalWordScore, handleReset } = { ...props }
    return (
        <div className="flex-centre">
            <Word
                wordToCheckArray={wordToCheckArray}
                handleTileClick={handleTileClick}
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