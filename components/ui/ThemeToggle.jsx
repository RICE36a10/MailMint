import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import React from "react";
import { toast } from "sonner"


const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const ThemeHandler = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        if(theme === "light"){
            toast("Set to Dark Theme");
        } else {
            toast("Set to Light Theme");
        }
    }
    return (
        <>
            <button
                onClick={ThemeHandler}
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full transition-all"
            >
                {theme === "dark" ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-900" />}
            </button>
        </>
    );
};

export default ThemeToggle;
