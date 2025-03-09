#pragma glslify: snoise = require('glsl-noise/simplex/2d')

precision mediump float;

uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;


varying vec2 vUv;

vec2 spiralTransform(vec2 uv, float time) {
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Galaxy-like differential rotation
    float rotationSpeed = 0.5 / (0.5 + dist); // Faster near center
    angle += time * rotationSpeed; // Rotate based on distance
    
    // Spiral arm warping (no radial displacement)
    float spiralTightness = 2.0; // Higher = tighter spiral
    angle += spiralTightness * log(1.0 + dist); // Logarithmic spiral
    
    // Convert back to Cartesian (preserve original distance)
    return vec2(
        dist * cos(angle),
        dist * sin(angle)
    );
}

float time_snoise(in vec2 st) {
    vec2 spiraled = spiralTransform(st, uTime * 0.01);
    
    // Subtle secondary rotation
    float rotAngle = uTime * 0.05;
    mat2 rotation = mat2(
        cos(rotAngle), -sin(rotAngle),
        sin(rotAngle), cos(rotAngle)
    );
    
    return snoise(rotation * spiraled * 2.0);
}

#define OCTAVES 4
float fbm(in vec2 st) {
    float value = 0.0;
    float amplitude = 0.09;
    float frequency = 0.4;
    
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * time_snoise(st * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

float pattern(in vec2 p) {
    vec2 centered = p - 2.5;
    float flowFactor = 0.05;
    
    vec2 q = vec2(
        fbm(centered + vec2(0.0) - flowFactor * centered),
        fbm(centered + vec2(5.2, 1.3) - flowFactor * centered)
    );
    
    vec2 r = vec2(
        fbm(centered + 4.0 * q + vec2(1.7, 9.2) - flowFactor * centered),
        fbm(centered + 4.0 * q + vec2(8.3, 2.8) - flowFactor * centered)
    );
    
    return fbm(centered + 4.0 * r);
}

void main() {
    
    vec2 p = vUv * 5.0;
    vec2 centered = p - 2.5;    
    
    // Get warped pattern
    float patternValue = pattern(p);
    
    // Combine effects
    vec3 color = mix(
        uColor1,
        uColor2,
        patternValue * 4.
    );
    
    gl_FragColor = vec4(color, 1.0);
}