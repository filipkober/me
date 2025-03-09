"use client"

import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import BackdropPlane from './BackdropPlane'
import Color from '@/util/Color'

interface Props {
    color1: Color,
    color2: Color
}
export default function ShaderBackground({ color1, color2 }: Props) {
  return (
    <Canvas gl={{alpha: true, antialias: false}} className='inset-0 -z-50 w-screen h-screen pointer-events-none fixed' style={{position: 'fixed'}}>
        <OrthographicCamera makeDefault={true} position={[0, 0, 1]} />
        <BackdropPlane color1={color1} color2={color2} />
    </Canvas>
  )
}
