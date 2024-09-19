import { createPortal } from "react-dom";
import "../styles/modal.css"

type ModalProps = {
    children: React.ReactNode,
    open: boolean,
    onClose: () => void
}

export default function HowToModal({ children, open, onClose }: ModalProps) {
    if (!open) return null

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                {children} {/* Insert content wrapped around component*/}
            </div>
        </>,
        document.getElementById('portal-root')! // ! - Non-Null assertion operation
    )

}

