import { Canvas } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei'
import BackdropPlane from './BackdropPlane'

export default function ShaderBackground() {
  return (
    <Canvas gl={{alpha: true, antialias: false}}>
        <OrthographicCamera makeDefault={true} position={[0, 0, 1]} />
        <BackdropPlane />
    </Canvas>
  )
}
