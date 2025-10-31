import { LetterProperties } from "../reusableTypes/LetterProperties"
import "../styles/tile.css"

type TileProp = LetterProperties & { onClick: () => void }

export default function Tile({ letter, score, onClick, colour, action }: TileProp) {
    return (
        <div onClick={onClick} data-test={`list-tile-${letter}`}
        >
            <h2 style={{ backgroundColor: colour, color: action === 'blank' ? '#fff' : '#000' }}>{letter}</h2>
            <h3>{score}</h3>
        </div>
    )
}