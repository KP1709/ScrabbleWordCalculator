import { createPortal } from "react-dom";
import "../../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void
}

export default function HistoryModal({ open, onClose }: ModalProps) {
    if (!open) return null

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <h2>Search history</h2>
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}