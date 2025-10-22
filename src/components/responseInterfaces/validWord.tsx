import Word from "../word"
import { LetterProperties } from "../../reusableTypes/LetterProperties"
import { useEffect, useState } from "react"

type ValidWordType = {
    wordToCheckArray: LetterProperties[],
    setWordToCheckArray: React.Dispatch<React.SetStateAction<LetterProperties[]>>
    submitWord: boolean
}

export default function ValidWord({ wordToCheckArray, setWordToCheckArray, submitWord }: ValidWordType) {
    const [totalWordScore, setTotalWordScore] = useState(0)
    const [totalWordScoreMultiplier, setTotalWordScoreMultiplier] = useState(1)
    const [resetMultiplier, setResetMultiplier] = useState(false)

    useEffect(() => {
        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0)
        setTotalWordScore(newTotal * totalWordScoreMultiplier)
    }, [wordToCheckArray, totalWordScoreMultiplier])

    useEffect(() => {
        if (submitWord || resetMultiplier) {
            setTotalWordScoreMultiplier(1)
        }
        setResetMultiplier(false)
    }, [submitWord, resetMultiplier])

    const handleMultiply = (factor: number) => {
        setTotalWordScoreMultiplier(prevMultiplier => prevMultiplier * factor)
    }

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
        <div className="flex-centre" data-test="valid-word-screen">
            <Word
                wordToCheckArray={wordToCheckArray}
                handleTileClick={handleTileClick}
            />

            <h3 id="score" data-test="total-word-score"> Total : {totalWordScore}</h3>

            <div id="multiplier__buttons" className="flex-centre">
                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button" data-test='double-total-score-btn'
                        onClick={() => handleMultiply(2)}>
                        Double total score
                    </button>}

                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button" data-test='triple-total-score-btn'
                        onClick={() => handleMultiply(3)}>
                        Triple total score
                    </button>}

                {totalWordScoreMultiplier !== 1 &&
                    <button className="multiplier__button" data-test='reset-total-score-btn'
                        onClick={() => setResetMultiplier(true)}>
                        Reset score multiplier
                    </button>}
            </div>
        </div>
    )

}