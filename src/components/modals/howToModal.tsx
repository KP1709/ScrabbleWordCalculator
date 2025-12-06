import { createPortal } from "react-dom";
import "../../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void
}

export default function HowToModal({ open, onClose }: ModalProps) {
    if (!open) return null

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <h2>Using the calculator</h2>
                <p>Enter a word and either press enter or the 'check' button</p>
                <p>If the word is within the Scrabble rules then it will be displayed along with the letter scores and total word score</p>
                <p>Tapping the tiles will cause letter scores to double, triple, display blank and reset back to its original value in this cycle</p>
                <p>The multiplier buttons below will double and/or triple the word score</p>
                <p>The tile bonus button adds 50 points to the total word score and will show if the word is longer than seven letters</p>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}

