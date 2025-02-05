import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Copy, Hash } from "lucide-react";
import { useState } from "react";
import { INSERT_CODE_COMMAND } from "../plugins/CodePlugin";

export default function InsertCodeDialog() {

    const [canCopy, setCanCopy] = useState(false);
    const [showLineNumbers, setShowLineNumbers] = useState(false);
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");

    const [editor] = useLexicalComposerContext();

    const onInsertCode = () => {
        if(!language || !code) return;
        const lines = code.split('\n');
        editor.dispatchCommand(INSERT_CODE_COMMAND, {
            canCopy,
            language,
            lines,
            showLineNumbers
        });
        setLanguage("");
        setCode("");
        setCanCopy(false);
        setShowLineNumbers(false);
    }

  return (
    <DialogContent>
        <DialogTitle>Insert Code</DialogTitle>
        <DialogDescription>Insert code into the editor</DialogDescription>
        <div className="flex flex-row gap-2">
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="csharp">C#</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="go">Go</SelectItem>
                    <SelectItem value="rust">Rust</SelectItem>
                    <SelectItem value="ruby">Ruby</SelectItem>
                    <SelectItem value="swift">Swift</SelectItem>
                    <SelectItem value="kotlin">Kotlin</SelectItem>
                    <SelectItem value="php">PHP</SelectItem>
                    <SelectItem value="shell">Shell</SelectItem>
                    <SelectItem value="powershell">PowerShell</SelectItem>
                    <SelectItem value="plaintext">Plain Text</SelectItem>
                </SelectContent>
            </Select>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle onClick={() => setShowLineNumbers(v => !v)} variant={"outline"} asChild><Hash /></Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Toggle line numbers</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle onClick={() => setCanCopy(v => !v)} variant={"outline"} asChild><Copy /></Toggle>
                    </TooltipTrigger>
                    <TooltipContent>Toggle copy button</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
        <Textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Insert your code here..." />
        <DialogFooter>
            <DialogClose asChild>
                <Button className="btn btn-primary" type="submit" onClick={onInsertCode}>Insert Code</Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
  )
}
