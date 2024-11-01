import { LetterProperties } from "../reusableTypes/LetterProperties";
import { v4 as uuid } from "uuid"
import Tile from "./tile";
import { useState } from "react";

type Word = {
    wordToCheckArray: LetterProperties[]
    setWordToCheckArray: React.Dispatch<React.SetStateAction<LetterProperties[]>>
}

export default function Word({wordToCheckArray, setWordToCheckArray}: Word){
    const [wordArray, setWordArray] = useState(wordToCheckArray)

    const sendUpdatedWordArray = () => {
        setWordToCheckArray(wordArray)
    }

    // Code produced by V0 but has been modified to work with original code written
    /** Handles multiplying letter score on tile */
    const handleTileClick = (id: string) => {
        setWordArray(prevValues => prevValues.map((tile) => {
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
            sendUpdatedWordArray()
            return tile
        }))
    }
    
    return (
        <ul className="flex-centre">
                {wordToCheckArray.map(char =>
                    <li key={uuid()} className="flex-centre" >
                        <Tile
                            id={char.id}
                            letter={char.letter}
                            score={char.score}
                            onClick={() => {handleTileClick(char.id)}}
                            action={char.action}
                            colour={char.colour}
                        />
                    </li>
                )}
            </ul>
    )
}