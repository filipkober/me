import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code, ImagePlus, Plus } from "lucide-react";
import ImagePlugin from "./ImagePlugin";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import InsertImageDialog from "../dialogs/InsertImageDialog";
import CodePlugin from "./CodePlugin";
import InsertCodeDialog from "../dialogs/InsertCodeDialog";

export enum InsertMode {
  Image = "Image",
  Code = "Code",
}

export default function InsertPlugin() {
  const [insertMode, setInsertMode] = useState<InsertMode>(InsertMode.Image);

  const dialogBody = ((type: InsertMode) => {
    switch (type) {
      case InsertMode.Image:
        return <InsertImageDialog />;
      case InsertMode.Code:
        return <InsertCodeDialog />;
    }
  })(insertMode);

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2 border-[1px] px-2">
            <span className="my-auto">Insert</span> <Plus className="my-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Component Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger
              asChild
              onClick={() => {
                setInsertMode(InsertMode.Image);
              }}
            >
              <DropdownMenuItem>
                <ImagePlus /> Image
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogTrigger
              asChild
              onClick={() => {
                setInsertMode(InsertMode.Code);
              }}
            >
              <DropdownMenuItem>
                <Code /> Code
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        {dialogBody}
      </Dialog>
      <ImagePlugin />
      <CodePlugin />
    </>
  );
}
