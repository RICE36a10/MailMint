import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
export function ViewHtmlDialog({ openDialog, htmlCode, closeDialog}) {
    const [isCopied, setIsCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard
            .writeText(htmlCode)
            .then(() => {
                setIsCopied(true);
                toast.success("Copied to Clipboard!");
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
            })
            .catch((err) => {
                toast.error("Failed to copy. Please try again!");
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <>

            {/*<Dialog open={openDialog} onOpenChange={closeDialog}>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogHeader>*/}
            {/*            <DialogTitle asChild>*/}
            {/*                <div className={"flex justify-between items-center p-2"}>*/}
            {/*                    <h2 className={'flex gap-2'}>*/}
            {/*                        Html Email Template{" "}*/}
            {/*                        <div className={'hover:scale-[1.6] transition-all cursor-pointer'}>*/}
            {/*                            🚀*/}
            {/*                        </div>*/}

            {/*                    </h2>*/}
            {/*                    <Copy*/}
            {/*                        className={*/}
            {/*                            "p-1 bg-gray-200 rounded-lg h-8 w-8 mr-5 hover:bg-red-200 hover:accent-red-500 transition-all hover:scale-110 cursor-pointer  "*/}
            {/*                        }*/}
            {/*                        onClick={copyCode}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </DialogTitle>*/}
            {/*            <DialogDescription asChild>*/}
            {/*                <div*/}
            {/*                    className={*/}
            {/*                        "max-h-[400px] overflow-auto bg-black rounded-lg p-5"*/}
            {/*                    }*/}
            {/*                >*/}
            {/*    <pre className={"whitespace-pre-wrap break-all"}>*/}
            {/*      <code>{htmlCode}</code>*/}
            {/*    </pre>*/}
            {/*                </div>*/}
            {/*            </DialogDescription>*/}
            {/*        </DialogHeader>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
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
                <code className="text-[#D4D4D4] font-mono">{htmlCode}</code>
              </pre>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
