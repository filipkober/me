import React from 'react'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import TextStylePlugin from './plugins/TextStylePlugin'
import HeadingPlugin from './plugins/HeadingPlugin'
import AlignPlugin from './plugins/AlignPlugin'
import ListPlugin from './plugins/ListPlugin'

export default function EditorToolbar() {
  return (
    <ScrollArea className='w-full whitespace-nowrap h-[4.2rem]' >
        <div className='flex gap-2 m-2'>
          <TextStylePlugin />
          <HeadingPlugin />
          <AlignPlugin />
          <ListPlugin />
        </div>
        <ScrollBar orientation='horizontal' />
    </ScrollArea>
  )
}
