'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_color_start;
  uniform vec3 u_color_end;

  // 2D Simplex Noise function by Inigo Quilez
  // A standard function for creating natural-looking procedural textures.
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion (fBm) - layering noise for more detail
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    // Normalize coordinates to be aspect-ratio correct
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv.x *= u_resolution.x / u_resolution.y;

    // -- Domain Warping --
    // 1. Create a base noise pattern that evolves over time.
    vec2 q = vec2(fbm(uv + u_time * 0.1), fbm(uv + vec2(1.0)));

    // 2. Use that first noise pattern (q) to distort the coordinates for a second noise pattern.
    vec2 r = vec2(fbm(uv + q * 0.5 + u_time * 0.2), fbm(uv + q * 0.7 + u_time * 0.15));

    // 3. Use the second warped noise pattern (r) to get the final value.
    float noise = fbm(uv + r);

    // Map the noise value from [-1, 1] to [0, 1]
    noise = (noise + 1.0) / 2.0;

    // Linearly interpolate between the start and end colors based on the noise
    vec3 color = mix(u_color_start, u_color_end, noise);

    gl_FragColor = vec4(color, 1.0);
  }
`

function FluidNoisePlane() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_color_start: { value: new THREE.Color('#78c5d6') }, // Teal-ish
      u_color_end: { value: new THREE.Color('#ffffff') }, // White
    }),
    []
  )

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      material.uniforms.u_time.value = state.clock.elapsedTime
    }
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [uniforms.u_resolution])

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default function FluidNoiseBackground() {
  return (
    <div className='fixed inset-0 -z-10'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <FluidNoisePlane />
      </Canvas>
    </div>
  )
}
