import Tile from "../components/tile"
import HowToModal from "../components/howToModal"
import { useState } from "react"
import { LetterProperties } from "../reusableTypes/LetterProperties"
import { v4 as uuid } from "uuid"

type ResponseInterface = {
    isValidString:string,
    isValidWord:boolean 
    handleTileClick:(id: string) => void,
    handleMultiply: (factor: number) => void,
    handleReset: () => void,
    totalWordScore: number,
    isAnalysing: boolean,
    totalWordScoreMultiplier: number,
    wordToCheckArray: LetterProperties[]
}


export default function ResponseInterfaces({
    isValidString, 
    isAnalysing, 
    isValidWord, 
    totalWordScore, 
    handleTileClick,
    handleMultiply,
    handleReset,
    totalWordScoreMultiplier, 
    wordToCheckArray}
    : ResponseInterface) 
    {
    const [isOpen, setIsOpen] = useState(false)

    if (isValidString === "start") {
        return (
            <div className="flex-centre">
                <h2>Enter a word to calculate score</h2>
                <div>
                    <button className="start__instructions-button" onClick={() => setIsOpen(true)}>View instructions here</button>
                    <HowToModal open={isOpen} onClose={() => setIsOpen(false)} />
                </div>
            </div>
        )
    }

    else if (isAnalysing) {
        return (
            <div className="flex-centre">
                <h2>Analysing...</h2>
            </div>
        )
    }

    else if (isValidString === "false") {
        return (
            <div className="flex-centre">
                <h2>Invalid Entry</h2>
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" /></svg>
            </div>
        )
    }

    else if (isValidString === "true" && isValidWord === false) {
        return (
            <div className="flex-centre">
                <h2>Unknown Word</h2>
                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" /></svg>
            </div>
        )
    }

    else {
        return (
            <div className="flex-centre">
                <ul className="flex-centre">
                    {wordToCheckArray.map(char =>
                        <li key={uuid()} className="flex-centre" >
                            <Tile id={char.id}
                                letter={char.letter}
                                score={char.score}
                                onClick={() => handleTileClick(char.id)}
                                action={char.action}
                                colour={char.colour}
                            />
                        </li>
                    )}
                </ul>
                <h3 id="score"> Total : {totalWordScore}</h3>
                <div id="multiplier__buttons" className="flex-centre">
                    {totalWordScoreMultiplier === 1 && <button className="multiplier__button" onClick={() => handleMultiply(2)}>
                        Double total score
                    </button>}
                    {totalWordScoreMultiplier === 1 && <button className="multiplier__button" onClick={() => handleMultiply(3)}>
                        Triple total score
                    </button>}
                    {totalWordScoreMultiplier !== 1 && <button className="multiplier__button" onClick={handleReset}>
                        Reset score multiplier
                    </button>}
                </div>
            </div>
        )
    }
}