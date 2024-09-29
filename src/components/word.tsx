import { LetterProperties } from "../reusableTypes/LetterProperties";
import { v4 as uuid } from "uuid"
import Tile from "./tile";
import { HandleTileClickContext, HandleTileClickContextType } from "./letterCalculator"
import { useContext } from "react"

type Word = {
    handleMultiply: (factor: number) => void,
    handleReset: () => void,
    wordToCheckArray: LetterProperties[]
}


export default function Word({wordToCheckArray}: Word){
    const { handleTileClick } = useContext(HandleTileClickContext) as HandleTileClickContextType
    
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