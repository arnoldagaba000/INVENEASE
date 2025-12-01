import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";

export default function ModeToggler() {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            <Toggle
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="group size-9 dark:bg-transparent dark:hover:bg-muted"
                onPressedChange={() =>
                    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                pressed={theme === "dark"}
                variant="outline"
            >
                <MoonIcon
                    aria-hidden="true"
                    className="shrink-0 scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100"
                    size={16}
                />
                <SunIcon
                    aria-hidden="true"
                    className="absolute shrink-0 scale-100 opacity-100 transition-all dark:scale-0 dark:opacity-0"
                    size={16}
                />
            </Toggle>
        </div>
    );
}
