import { LetterProperties } from "../../reusableTypes/LetterProperties"
import Word from "../word"

type ValidWordType = {
    totalWordScore: number,
    handleMultiply: (factor: number) => void,
    handleReset: () => void
    totalWordScoreMultiplier: number
    wordToCheckArray: LetterProperties[]
    setWordToCheckArray: React.Dispatch<React.SetStateAction<LetterProperties[]>>

}

export default function ValidWord({ ...props }: ValidWordType) {
    const { wordToCheckArray, setWordToCheckArray, handleMultiply, totalWordScoreMultiplier, totalWordScore, handleReset } = { ...props }
    
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