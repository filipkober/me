import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $getSelection, $isRangeSelection,  } from 'lexical';
import { $createListNode, $isListItemNode, $isListNode, ListItemNode, ListNode, ListType } from '@lexical/list';
import { List, ListOrdered, ListChecks } from 'lucide-react'
import { useEffect, useState } from 'react';

const isListType = (type: string): type is ListType => {
    return ['bullet', 'number', 'check'].includes(type);
}

const getListNodeOfListItemNode = (node: ListItemNode): ListNode | null => {
    let parent = node.getParent();
    while(parent) {
        if($isListNode(parent)) {
            return parent;
        }
        parent = parent.getParent();
    }
    return null;
}

export default function ListPlugin() {

    const [editor] = useLexicalComposerContext();

    const [selectedType, setSelectedType] = useState('');

    const onValueChange = (value: string) => {

        setSelectedType(value);

        editor.update(() => {

            const selection = $getSelection();

            if(isListType(value) && value !== selectedType) {
                $setBlocksType(selection, () => $createListNode(value));
            } else {
                $setBlocksType(selection, () => $createParagraphNode());
            }
        })
    };

    useEffect(() => {
        return editor.registerUpdateListener(() => {
            editor.read(() => {
                const selection = $getSelection();
                if($isRangeSelection(selection)) {
                    let node = selection.anchor.getNode();
                    if(!$isListItemNode(node)){
                        const parent = node.getParent();
                        if($isListItemNode(parent)) {
                            node = parent;
                        }
                    }
                    if($isListItemNode(node)) {
                        const listNode = getListNodeOfListItemNode(node);
                        if(listNode) {
                            setSelectedType(listNode.getListType());
                        } else {
                            setSelectedType('');
                        }
                    } else {
                        setSelectedType('');
                    }
                }
            })
        })
    }, [editor])

  return (
    <ToggleGroup type='single' className='flex w-fit shrink-0 border-[1px]' onValueChange={onValueChange} value={selectedType}>
        <ToggleGroupItem value='bullet'><List /></ToggleGroupItem>
        <ToggleGroupItem value='number'><ListOrdered /></ToggleGroupItem>
        <ToggleGroupItem value='check'><ListChecks /></ToggleGroupItem>
    </ToggleGroup>
  )
}
