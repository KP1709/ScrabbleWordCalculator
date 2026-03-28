import { useState } from "react";

export function useSettings() {
    const [isWordToBeChecked, setIsWordToBeChecked] = useState(() => {
        const wordCheck = sessionStorage.getItem("isWordToBeChecked");
        return wordCheck === "true" ? true : false;
    });
    const [isExtendedCheck, setIsExtendedCheck] = useState(() => {
        const extendedCheck = sessionStorage.getItem("isExtendedCheck");
        return extendedCheck === "true" ? true : false;
    });
    const [isStoreSearchHistory, setIsStoreSearchHistory] = useState(() => {
        const storeSearchHistory = sessionStorage.getItem("isStoreSearchHistory");
        return storeSearchHistory === "true" ? true : false;
    });
    const [rerender, setRerender] = useState(0);

    const currentTheme = sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || "";

    const handleWordCheck = (checked: boolean) => {
        setIsWordToBeChecked(checked);
        sessionStorage.setItem("isWordToBeChecked", JSON.stringify(checked));
        if (!checked) {
            setIsExtendedCheck(false);
            sessionStorage.setItem("isExtendedCheck", JSON.stringify(false));
            setIsStoreSearchHistory(false);
            sessionStorage.setItem("isStoreSearchHistory", JSON.stringify(false));
        }
    };

    const handleExtendedWordCheck = (checked: boolean) => {
        setIsExtendedCheck(checked);
        sessionStorage.setItem("isExtendedCheck", JSON.stringify(checked));
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            sessionStorage.setItem("isWordToBeChecked", JSON.stringify(true));
        }
    };

    const handleSearchHistory = (checked: boolean) => {
        setIsStoreSearchHistory(checked);
        sessionStorage.setItem("isStoreSearchHistory", JSON.stringify(checked));
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            sessionStorage.setItem("isWordToBeChecked", JSON.stringify(true));
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
