"use client"
import vertex_shader from '@/util/three/backdrop_plane.vert'
import fragment_shader from '@/util/three/backdrop_plane.frag'
import { Plane, shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Color as ThreeColor } from 'three'
import Color from '@/util/Color'
import { randomElement } from '@/util/randomUtils'

type Uniforms = {
    uTime: number
    uColor1: ThreeColor
    uColor2: ThreeColor
    uSpiral: boolean
}

const initialUSpiral = randomElement([true, false])
const initialUTime = initialUSpiral ? randomElement([0, 2000]) : 0;

const INITIAL_UNIFORMS: Uniforms = {
    uTime: initialUTime,
    uColor1: Color.black().toThreeColor(),
    uColor2: Color.red().toThreeColor(),
    uSpiral: initialUSpiral
}

const BackdropPlaneShader = shaderMaterial(INITIAL_UNIFORMS, vertex_shader, fragment_shader)

const BackdropPlaneShaderMaterial = extend(BackdropPlaneShader)

interface Props {
    color1: Color,
    color2: Color
}

export default function BackdropPlane({ color1, color2 }: Props) {

    const { viewport } = useThree();
    const shader = useRef<typeof BackdropPlaneShaderMaterial & Uniforms>(null);

    useFrame(({clock}) => {
        if(!shader.current) return;

        shader.current.uTime = clock.elapsedTime + initialUTime;
        shader.current.uColor1 = color1.toThreeColor();
        shader.current.uColor2 = color2.toThreeColor();
    })

  return (
    <Plane args={[viewport.width, viewport.height, 1, 1]} position={[0,0,0]}>
        <BackdropPlaneShaderMaterial key={BackdropPlaneShader.key} ref={shader} {...INITIAL_UNIFORMS} />
    </Plane>
  )
}