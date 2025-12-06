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
                <button onClick={onClose}>Close</button>
                <h2>Search history</h2>
                {searchHistory.length === 0 ? (
                    <p>No search history available.</p>
                ) : (
                    <ul className='modal-list'>
                        {searchHistory.map((word: string, index: number) => (
                            <li key={index} onClick={() => { setWordToCheck(word) }}>{word}</li>
                        ))}
                    </ul>
                )}
            </div>

        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}