import { useState } from "react";
import HowToModal from "../howToModal";

export default function StartScreen() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex-centre-column response-interface" data-test="start-screen-screen">
            <h2>Enter a word to calculate score</h2>
            <div>
                <button className="start__instructions-button" onClick={() => setIsOpen(true)}>View instructions here</button>
                <HowToModal open={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </div>
    )
}