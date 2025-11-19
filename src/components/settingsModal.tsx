import { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/modal.css"

type ModalProps = {
    open: boolean,
    onClose: () => void
}

export default function SettingsModal({ open, onClose }: ModalProps) {
    if (!open) return null;

    const [isWordToBeChecked, setIsWordToBeChecked] = useState(() => {
        const wordCheck = sessionStorage.getItem("isWordToBeChecked");
        return wordCheck === "true" ? true : false;
    });
    const [isExtendedCheck, setIsExtendedCheck] = useState(() => {
        const extendedCheck = sessionStorage.getItem("isExtendedCheck");
        return extendedCheck === "true" ? true : false;
    });

    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) return null;

    return createPortal(
        <>
            <div className="modal-overlay"></div>
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <h2>Settings</h2>
                <span className='flex-centre-column' style={{ gap: '10px', alignItems: 'flex-start' }}>
                    <span>
                        <input
                            type="checkbox"
                            id="wordCheckSetting"
                            checked={isWordToBeChecked}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setIsWordToBeChecked(checked);
                                sessionStorage.setItem("isWordToBeChecked", JSON.stringify(checked));
                                if (!checked) {
                                    setIsExtendedCheck(false);
                                    sessionStorage.setItem("isExtendedCheck", JSON.stringify(false));
                                }
                            }}
                        />
                        <label htmlFor="wordCheckSetting" style={{ color: 'white' }}>Check word against dictionary</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="extendedCheckSetting"
                            checked={isExtendedCheck}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setIsExtendedCheck(checked);
                                sessionStorage.setItem("isExtendedCheck", JSON.stringify(checked));
                                if (checked && !isWordToBeChecked) {
                                    setIsWordToBeChecked(true);
                                    sessionStorage.setItem("isWordToBeChecked", JSON.stringify(true));
                                }
                            }}
                        />
                        <label htmlFor="extendedCheckSetting" style={{ color: 'white' }}>Enable extended word check</label>
                    </span>
                </span>
            </div>
        </>,
        portalRoot
    );
}

