import { createPortal } from "react-dom";
import "../../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void,
    setWordToCheck: (value: string) => void,
}

export default function HistoryModal({ open, onClose, setWordToCheck }: ModalProps) {
    if (!open) return null

    const searchHistory = JSON.parse(sessionStorage.getItem("searchHistory") || "[]");

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
                <h2>Search history</h2>
                {searchHistory.length === 0 ? (
                    <p>No search history available.</p>
                ) : (
                    <ul className='modal-list'>
                        {searchHistory.map((word: string, index: number) => (
                            <li key={index} onClick={() => { setWordToCheck(word); onClose() }}>{word}</li>
                        ))}
                    </ul>
                )}
            </div>

        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}