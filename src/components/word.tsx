import { LetterProperties } from "../reusableTypes/LetterProperties";
import { v4 as uuid } from "uuid"
import Tile from "./tile";

type Word = {
    handleTileClick: (id: string) => void,
    handleMultiply: (factor: number) => void,
    handleReset: () => void,
    wordToCheckArray: LetterProperties[]
}

export default function Word({wordToCheckArray, handleTileClick}: Word){
    return (
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
    )
}