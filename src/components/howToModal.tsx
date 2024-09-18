import { createPortal } from "react-dom";
import "../styles/modal.css"


export default function HowToModal({ children, open, onClose }: any) {
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

