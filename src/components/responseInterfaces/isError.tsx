import { useState } from "react"

export default function Error({ wordToCheck }: { wordToCheck: string }) {
    const [word] = useState(wordToCheck)

    return (
        <div className="flex-centre-column" data-test="error-screen">
            <h2>Error validating word - search online instead</h2>
            <a href={`https://www.google.com/search?q=${word}`} target="_blank">{word}&#128269;</a>
            <svg className='svg-response' aria-hidden='true' focusable='false' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
            </svg>
        </div>
    )

}

