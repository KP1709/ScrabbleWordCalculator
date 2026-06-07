import "../../styles/modal.css";
import { clearSearchHistory } from "../../reusableFunctions/searchHistorySave";
import { useSettings } from "../../hooks/useSettings";
import Modal from "./modal";
import { SettingsModalType } from "../../reusableTypes/ModalProperties";

const OPTIONS = [
    { value: "original-theme", label: "Original theme" },
    { value: "dark-theme", label: "Dark theme" },
    { value: "water-theme", label: "Water theme" },
    { value: "pastel-earth-theme", label: "Pastel Earth theme" }
];

const SettingsModal = ({ isOpen, onClose, isStoreSearchHistory, setIsStoreSearchHistory }: SettingsModalType) => {
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

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>

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
                        {OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </span>
            </span>
        </Modal>
    );
};

export default SettingsModal;

