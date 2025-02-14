import React from 'react'
import TerminalLine from './TerminalLine'
import "@/styles/Terminal.css"

interface Props {
    lines: string[]
}
export default function DecorativeTerminal({lines}: Props) {
  return (
    <div className='bg-gray-500 rounded-xl p-4 w-1/3'>
        <div className="bg-black text-green-600 p-4 font-[pressStart2P] aspect-square overflow-y-auto crt relative">
        {lines.map((line, i) => (
            <TerminalLine key={i} text={line} />
        ))}
    </div>
    </div>
  )
}
