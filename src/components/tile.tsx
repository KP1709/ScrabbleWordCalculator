import { LetterProperties } from "../reusableTypes/LetterProperties"
import "../styles/tile.css"

type TileProp = LetterProperties & { onClick: () => void }

export default function Tile({ letter, score, onClick, colour }: TileProp) {
    return (
        <div onClick={onClick} data-test={`list-tile-${letter}`}
        >
            <h2 className={`flex-centre-column ${colour}`}>{letter}</h2>
            <h3 className="flex-centre-column">{score}</h3>
        </div>
    )
}