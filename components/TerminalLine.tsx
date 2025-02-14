import React from 'react'

interface Props {
    text: string
}
export default function TerminalLine({text}: Props) {
  return (
    <p className='text-wrap'>&gt; {text}</p>
  )
}
