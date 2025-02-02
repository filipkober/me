import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import TextStylePlugin from './TextStylePlugin'

export default function EditorToolbar() {
  return (
    <ScrollArea className='w-full flex-none m-2'>
        <TextStylePlugin />
        <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
