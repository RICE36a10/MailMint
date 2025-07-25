import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Check } from "lucide-react";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import { notify } from "@/lib/notify";
export function ViewHtmlDialog({ openDialog, htmlCode, closeDialog}) {
    const [isCopied, setIsCopied] = useState(false);
    const [formattedCode, setFormattedCode] = useState(htmlCode || "");

    useEffect(() => {
        if (!htmlCode) return;
        try {
            const pretty = prettier.format(htmlCode, {
                parser: "html",
                plugins: [parserHtml],
            });
            setFormattedCode(pretty);
        } catch (err) {
            console.error("HTML formatting failed", err);
            setFormattedCode(htmlCode);
        }
    }, [htmlCode]);

    const copyCode = () => {
        navigator.clipboard
            .writeText(formattedCode)
            .then(() => {
                setIsCopied(true);
                notify("HTML copied");
                setTimeout(() => setIsCopied(false), 1200); // Reset after 2 seconds
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <>
            <Dialog open={openDialog} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className="flex items-center justify-between">
                                <h2>HTML Email Template</h2>
                                <div className="relative">
                                    <button
                                        onClick={copyCode}
                                        className="p-1 rounded-full hover:bg-gray-200 transition-colors focus:outline-none"
                                        aria-label={
                                            isCopied ? "Copied successfully" : "Copy to clipboard"
                                        }
                                    >
                                        {isCopied ? (
                                            <Check className="h-5 w-5 text-green-500 transition-transform duration-300 scale-110" />
                                        ) : (
                                            <Copy className="h-5 w-5 text-gray-600 transition-transform duration-300 hover:scale-110" />
                                        )}
                                    </button>
                                    {/* Tooltip */}
                                    <span
                                        className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity duration-200 ${
                                            isCopied
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    >
                  {isCopied ? "Copied successfully!" : "Copy to clipboard"}
                </span>
                                </div>
                            </div>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className="max-h-[400px] overflow-auto bg-[#1E1E1E] rounded-lg p-5">
              <pre className="whitespace-pre-wrap break-all">
                <code className="text-[#D4D4D4] font-mono">{formattedCode}</code>
              </pre>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
