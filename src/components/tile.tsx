import "../styles/tile.css"

type Tile = {
    letter: string,
    score: number
}

export default function Tile(props : Tile){
    return(
        <>
            <h2>{props.letter}</h2>
            <h3>{props.score}</h3>
        </>
    )
}