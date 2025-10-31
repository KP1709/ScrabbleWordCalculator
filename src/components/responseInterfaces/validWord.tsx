import { LetterProperties } from "../../reusableTypes/LetterProperties"
import { useEffect, useState } from "react"
import { useLookupLettersFromWord } from "../../hooks/useLookupLettersFromWord"
import { v4 as uuid } from "uuid"
import Tile from "../tile";

type ValidWordType = {
    wordToCheck: string,
    submitWord: boolean
}

export default function ValidWord({ submitWord, wordToCheck }: ValidWordType) {
    const [totalWordScore, setTotalWordScore] = useState(0)
    const [totalWordScoreMultiplier, setTotalWordScoreMultiplier] = useState(1)
    const [resetMultiplier, setResetMultiplier] = useState(false)
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])

    useEffect(() => {
        setWordToCheckArray(useLookupLettersFromWord(wordToCheck))
    }, [submitWord])

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
                        return { ...tile, score: tile.originalScore * 3, action: 'triple', colour: '#0077b6' };
                    case 'triple':
                        return { ...tile, score: 0, action: 'blank', colour: '#ffffff' };
                    case 'blank':
                        return { ...tile, score: tile.originalScore, action: 'restore', colour: '#ffffff' };
                    case 'restore':
                        return { ...tile, score: tile.originalScore * 2, action: 'double', colour: '#90e0ef' };
                }
            }
            return tile
        }))
    }

    return (
        <div className="flex-centre" data-test="valid-word-screen">
            <ul className="flex-centre">
                {wordToCheckArray.map(char =>
                    <li key={uuid()} className="flex-centre" data-test='word-tile'>
                        <Tile
                            id={char.id}
                            letter={char.letter}
                            score={char.score}
                            onClick={() => { handleTileClick(char.id); }}
                            action={char.action}
                            colour={char.colour}
                            originalScore={char.originalScore} />
                    </li>
                )}
            </ul>

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