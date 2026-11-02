import { useCallback, useState, type ReactNode } from "react";
import { SettingsContext } from "./SettingsContext";

const getSettingValue = (key: string, defaultValue = false) => {
    return sessionStorage.getItem(key) === "true" ? true : defaultValue;
};

const setSettingValue = (key: string, value: boolean) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export function SettingsProvider({ children }: { children: ReactNode; }) {
    const [isWordToBeChecked, setIsWordToBeChecked] = useState(() => getSettingValue("isWordToBeChecked"));
    const [isStoreSearchHistory, setIsStoreSearchHistory] = useState(() => getSettingValue("isStoreSearchHistory"));
    const [rerender, setRerender] = useState(0);

    const currentTheme = sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || "";

    const handleWordCheck = (checked: boolean) => {
        setIsWordToBeChecked(checked);
        setSettingValue("isWordToBeChecked", checked);
        if (!checked) {
            setIsStoreSearchHistory(false);
            setSettingValue("isStoreSearchHistory", false);
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

    const handleThemeSelection = useCallback((theme: string) => {
        document.body.setAttribute("data-theme", theme);
        sessionStorage.setItem("currentTheme", JSON.stringify(theme));
        setRerender(n => n + 1);
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                isWordToBeChecked,
                isStoreSearchHistory,
                setIsWordToBeChecked,
                setIsStoreSearchHistory,
                rerender,
                setRerender,
                currentTheme,
                handleWordCheck,
                handleSearchHistory,
                handleThemeSelection,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}
