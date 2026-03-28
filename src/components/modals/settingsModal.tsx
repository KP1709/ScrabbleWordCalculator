import { createPortal } from "react-dom";
import "../../styles/modal.css";
import { clearSearchHistory } from "../../reusableFunctions/searchHistorySave";
import { useSettings } from "../../hooks/useSettings";

type ModalProps = {
    open: boolean,
    onClose: () => void,
    isStoreSearchHistory: boolean,
    setIsStoreSearchHistory: (value: boolean) => void;
};

export default function SettingsModal({ open, onClose, isStoreSearchHistory, setIsStoreSearchHistory }: ModalProps) {
    if (!open) return null;

    const {
        isWordToBeChecked,
        isExtendedCheck,
        setRerender,
        currentTheme,
        handleWordCheck,
        handleExtendedWordCheck,
        handleSearchHistory,
        handleThemeSelection
    } = useSettings();

    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) return null;

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
                <h2>Settings</h2>
                <span className='flex-centre-column' style={{ gap: '10px', alignItems: 'flex-start' }}>
                    <span>
                        <input
                            type="checkbox"
                            id="wordCheckSetting"
                            checked={isWordToBeChecked}
                            onChange={e => handleWordCheck(e.target.checked)}
                        />
                        <label htmlFor="wordCheckSetting">Check word against dictionary</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="extendedCheckSetting"
                            checked={isExtendedCheck}
                            onChange={e => handleExtendedWordCheck(e.target.checked)}
                        />
                        <label htmlFor="extendedCheckSetting">Enable extended word check</label>
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            id="wordSearchHistoryChecking"
                            checked={isStoreSearchHistory}
                            onChange={e => {
                                handleSearchHistory(e.target.checked);
                                setIsStoreSearchHistory(e.target.checked);
                            }}
                        />
                        <label htmlFor="wordSearchHistoryChecking">Store words in search history</label>
                    </span>
                    <span>
                        <label htmlFor="clearSearchHistory">Clear search history</label>
                        <button
                            id='clearSearchHistory'
                            onClick={() => { setRerender((n) => n + 1); clearSearchHistory(); }}
                            disabled={!isStoreSearchHistory || sessionStorage.getItem('searchHistory') === '[]'}>
                            Clear
                        </button>
                    </span>
                    <span>
                        <label htmlFor="themeSelection">Select theme:</label>
                        <select name="themeSelection" id="themeSelection"
                            value={currentTheme}
                            onChange={e => handleThemeSelection(e.target.value)}>
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

