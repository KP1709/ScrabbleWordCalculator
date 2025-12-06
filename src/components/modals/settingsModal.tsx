import { useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/modal.css"

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

    const [isStoreSearchHistory, setIsStoreSearchHistory] = useState(() => {
        const searchHistory = sessionStorage.getItem("isStoreSearchHistory");
        return searchHistory === "true" ? true : false;
    })
    const [, setRerender] = useState(0);

    const currentTheme = sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || "";

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
                            onChange={e => {
                                const checked = e.target.checked;
                                setIsWordToBeChecked(checked);
                                sessionStorage.setItem("isWordToBeChecked", JSON.stringify(checked));
                                if (!checked) {
                                    setIsExtendedCheck(false);
                                    sessionStorage.setItem("isExtendedCheck", JSON.stringify(false));
                                }
                            }}
                        />
                        <label htmlFor="wordCheckSetting">Check word against dictionary</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="extendedCheckSetting"
                            checked={isExtendedCheck}
                            onChange={e => {
                                const checked = e.target.checked;
                                setIsExtendedCheck(checked);
                                sessionStorage.setItem("isExtendedCheck", JSON.stringify(checked));
                                if (checked && !isWordToBeChecked) {
                                    setIsWordToBeChecked(true);
                                    sessionStorage.setItem("isWordToBeChecked", JSON.stringify(true));
                                }
                            }}
                        />
                        <label htmlFor="extendedCheckSetting">Enable extended word check</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="wordSearchHistoryChecking"
                            checked={isStoreSearchHistory}
                            onChange={e => {
                                const checked = e.target.checked;
                                setIsStoreSearchHistory(checked);
                                sessionStorage.setItem("isStoreSearchHistory", JSON.stringify(checked));
                                if (!checked) {
                                    sessionStorage.setItem("searchHistory", JSON.stringify([]));
                                }
                            }}
                        />
                        <label htmlFor="wordSearchHistoryChecking">Store words in search history (cleared if unchecked)</label>
                    </span>
                    <span>
                        <label htmlFor="themeSelection">Select theme:</label>
                        <select name="themeSelection" id="themeSelection"
                            value={currentTheme}
                            onChange={(e) => {
                                document.body.setAttribute("data-theme", e.target.value);
                                sessionStorage.setItem("currentTheme", JSON.stringify(e.target.value));
                                setRerender(n => n + 1); // Force re-render to update dropdown
                            }}>
                            <option value="original-theme">Original theme</option>
                            <option value="dark-theme">Dark theme</option>
                            <option value="water-theme">Water theme</option>
                            <option value="pastel-earth-theme">Pastel Earth theme</option>
                        </select>
                    </span>
                </span>
            </div>
        </>,
        portalRoot
    );
}
