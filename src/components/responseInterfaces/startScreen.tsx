import { useState } from "react";
import HowToModal from "../modals/howToModal";
import useBreakpoint from "../../hooks/useBreakpoint";

export default function StartScreen() {
    const breakpoint = useBreakpoint()
    const [isHowToModalOpen, setIsHowToModalOpen] = useState(false)

    return (
        <div className="flex-centre-column response-interface" data-test="start-screen-screen">
            <h2>Enter a word to calculate score</h2>
            <div className="flex-centre-column">
                {breakpoint >= 450 &&
                    <>
                        <button className="start__instructions-button" onClick={() => setIsHowToModalOpen(true)}>View instructions</button>
                        <HowToModal open={isHowToModalOpen} onClose={() => setIsHowToModalOpen(false)} />
                    </>}
            </div>
        </div>
    )
}