import { createPortal } from "react-dom";
import "../styles/modal.css"

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
                <h2>How to use the calculator</h2>
                <p>Enter a word in the text box and either press enter or the 'check' button</p>
                <p>If the word contains other characters than letters it will display 'Invalid entry'</p>
                <p>If the word is not in the dictionary it will display 'Unknown Word'</p>
                <p>If it contains letters and is definitely a word then the word, letter scores and total word score will be displayed</p>
                <p>Tapping the tiles will cause letter scores to double, triple, set to 0 and reset back to its original value in this cycle</p>
                <p>The multiplier buttons below will double or triple the word score</p>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}

