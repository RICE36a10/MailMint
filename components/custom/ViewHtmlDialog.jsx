import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
export function ViewHtmlDialog({ openDialog, htmlCode, closeDialog }) {
    const copyCode = () => {
        try {
            navigator.clipboard.writeText(htmlCode);
            toast.success("Copied to Clipboard!");
        } catch (error) {
            toast.error("Failed to copy. Please try again!");
            console.error("Clipboard Copy Error:", error);
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Dialog open={openDialog} onOpenChange={closeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle asChild>
                            <div className={"flex justify-between items-center p-2"}>
                                <h2 className={'flex gap-2'}>
                                    Html Email Template{" "}
                                    <div className={'hover:scale-[1.6] transition-all cursor-pointer'}>
                                        🚀
                                    </div>

                                </h2>
                                <Copy
                                    className={
                                        "p-1 bg-gray-200 rounded-lg h-8 w-8 mr-5 hover:bg-red-200 hover:accent-red-500 transition-all hover:scale-110 cursor-pointer  "
                                    }
                                    onClick={copyCode}
                                />
                            </div>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div
                                className={
                                    "max-h-[400px] overflow-auto bg-black rounded-lg p-5"
                                }
                            >
                <pre className={"whitespace-pre-wrap break-all"}>
                  <code>{htmlCode}</code>
                </pre>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

{
    /*<SyntaxHighlighter*/
}
{
    /*    language="html"*/
}
{
    /*    style={oneDark}*/
}
{
    /*    wrapLines={true}*/
}
{
    /*    wrapLongLines={true}*/
}
{
    /*    customStyle={{*/
}
{
    /*        whiteSpace: "pre-wrap", */
}
{
    /*        wordBreak: "break-word",*/
}
{
    /*        overflowX: "auto",      */
}
{
    /*        width: "100%",          */
}
{
    /*    }}*/
}
{
    /*>*/
}
{
    /*    {htmlCode}*/
}
{
    /*</SyntaxHighlighter>*/
}
