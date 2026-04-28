
import { useState } from "react";

const getSettingValue = (key: string, defaultValue = false) => {
    return sessionStorage.getItem(key) === "true" ? true : defaultValue;
};

const setSettingValue = (key: string, value: boolean) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export function useSettings() {
    const [isWordToBeChecked, setIsWordToBeChecked] = useState(() => getSettingValue("isWordToBeChecked"));
    const [isExtendedCheck, setIsExtendedCheck] = useState(() => getSettingValue("isExtendedCheck"));
    const [isStoreSearchHistory, setIsStoreSearchHistory] = useState(() => getSettingValue("isStoreSearchHistory"));
    const [rerender, setRerender] = useState(0);

    const currentTheme = sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || "";

    const handleWordCheck = (checked: boolean) => {
        setIsWordToBeChecked(checked);
        setSettingValue("isWordToBeChecked", checked);
        if (!checked) {
            setIsExtendedCheck(false);
            setSettingValue("isExtendedCheck", false);
            setIsStoreSearchHistory(false);
            setSettingValue("isStoreSearchHistory", false);
        }
    };

    const handleExtendedWordCheck = (checked: boolean) => {
        setIsExtendedCheck(checked);
        setSettingValue("isExtendedCheck", checked);
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            setSettingValue("isWordToBeChecked", true);
        }
    };

    const handleSearchHistory = (checked: boolean) => {
        setIsStoreSearchHistory(checked);
        setSettingValue("isStoreSearchHistory", checked);
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            setSettingValue("isWordToBeChecked", true);
        }
    };

    const handleThemeSelection = (theme: string) => {
        document.body.setAttribute("data-theme", theme);
        sessionStorage.setItem("currentTheme", JSON.stringify(theme));
        setRerender(n => n + 1); // Force re-render to update dropdown
    };

    return {
        isWordToBeChecked,
        isExtendedCheck,
        isStoreSearchHistory,
        rerender,
        setRerender,
        currentTheme,
        handleWordCheck,
        handleExtendedWordCheck,
        handleSearchHistory,
        handleThemeSelection
    };
}
