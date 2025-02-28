import vertex_shader from '@/util/three/backdrop_plane.vert'
import fragment_shader from '@/util/three/backdrop_plane.frag'
import { Plane, shaderMaterial } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { ShaderMaterial } from 'three'
import { JSX, useRef } from 'react'

type Uniforms = {
    uTime: number
}

const INITIAL_UNIFORMS: Uniforms = {
    uTime: 0
}

const BackdropPlaneShader = shaderMaterial(INITIAL_UNIFORMS, vertex_shader, fragment_shader)

extend({ BackdropPlaneShader })

export default function BackdropPlane() {

    const { viewport } = useThree();
    const shader = useRef<ShaderMaterial & Partial<Uniforms>>(null);

    useFrame(({clock}) => {
        if(!shader.current) return;

        shader.current.uTime = clock.getElapsedTime();
    })

  return (
    <Plane args={[viewport.width, viewport.height, 1, 1]} position={[0,0,0]}>
        <backdropPlaneShader key={BackdropPlaneShader.key} ref={shader} uTime={0} />
    </Plane>
  )
}

declare module '@react-three/fiber' {
    interface ThreeElements {
        backdropPlaneShader: JSX.IntrinsicElements['mesh'] & {
            key?: string;
            ref?: React.Ref<ShaderMaterial & Partial<Uniforms>>;
        } & Partial<Uniforms>;
    }
}