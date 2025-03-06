import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {toast, Toaster} from "react-hot-toast";
import React from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const ThemeHandler = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        if(theme === "light"){
            toast.success("Set to Dark Theme");
        } else {
            toast.success("Set to Light Theme");
        }
    }
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} /> {/*pauseOnHover={true}*/}
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
