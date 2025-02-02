import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import TextStylePlugin from './TextStylePlugin'
import HeadingPlugin from './HeadingPlugin'
import AlignPlugin from './AlignPlugin'

export default function EditorToolbar() {
  return (
    <ScrollArea className='w-full whitespace-nowrap h-[4.2rem]' >
        <div className='flex gap-2 m-2'>
          <TextStylePlugin />
          <HeadingPlugin />
          <AlignPlugin />
        </div>
        <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
