uniform float u_time;

varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    gl_FragColor = vec4(color, 1.0);
}
    