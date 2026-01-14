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
                <button className='close-button' onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
                        </path>
                    </svg>
                </button>
                <h2>Using the calculator</h2>
                <p>Enter a word and either press enter or the 'check' button</p>
                <p>If the word is within the Scrabble rules then it will be displayed along with the letter scores and total word score</p>
                <p>Tapping the tiles will cause letter scores to double, triple, display blank and reset back to its original value in this cycle</p>
                <p>The multiplier buttons below will double and/or triple the word score</p>
                <p>The tile bonus button adds 50 points to the total word score and will show if the word is longer than seven letters</p>
                <p>The reset button will reset all multipliers and tile changes to the word</p>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}

