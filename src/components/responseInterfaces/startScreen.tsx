import { useState } from "react";
import HowToModal from "../howToModal";

export default function StartScreen() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex-centre" data-test="start-screen">
            <h2>Enter a word to calculate score</h2>
            <div>
                <button
                    className="start__instructions-button"
                    onClick={() => setIsOpen(true)}
                    data-test="view-instructions-button">
                    View instructions here
                </button>
                <HowToModal open={isOpen} onClose={() => setIsOpen(false)} />
            </div>
        </div>
    )
}