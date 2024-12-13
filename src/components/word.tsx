import { LetterProperties } from "../reusableTypes/LetterProperties";
import { v4 as uuid } from "uuid"
import Tile from "./tile";
import { useState } from "react";

type Word = {
    wordToCheckArray: LetterProperties[]
    handleTileClick: (id: string) => void
}

export default function Word({ wordToCheckArray, handleTileClick }: Word) {
    const [wordArray, setWordArray] = useState(wordToCheckArray)

    const sendUpdatedWordArray = () => {
        setWordArray(wordArray)
    }

    return (
        <ul className="flex-centre">
            {wordToCheckArray.map(char =>
                <li key={uuid()} className="flex-centre" data-test='word-tile'>
                    <Tile
                        id={char.id}
                        letter={char.letter}
                        score={char.score}
                        onClick={() => {
                            handleTileClick(char.id), sendUpdatedWordArray()
                        }}
                        action={char.action}
                        colour={char.colour}
                    />
                </li>
            )}
        </ul>
    )
}