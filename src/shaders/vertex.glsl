precision highp float;
uniform float u_time;
varying float vAlpha;
varying vec2 vUv;
varying vec3 noisy;
varying vec3 finalPos;

// #pragma glslify: pnoise = require(./Noise/perlin);
#pragma glslify: cnoise = require(./Noise/curl);

float nScale = .02;
void main() {
  vUv = uv;

  // finalPos = vec3(position.x, (position.y + 1.5) * pnoise(vec2(u_time / 4000. + position.x / 10. , u_time / 4000. + position.z / 10.)), position.z);

  finalPos = position;
  noisy = cnoise(vec3(nScale) * finalPos + vec3(u_time * .01));
  noisy = pow(noisy, vec3(2.)) * 12.;
  finalPos += noisy;

  vAlpha = (1. - (smoothstep(6.7, 30., -finalPos.z) - smoothstep(20., 100., -finalPos.z)));
  vec4 mvPosition = modelViewMatrix * vec4(vec3(finalPos), 1.);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize =  5. * (1. / ((smoothstep(10., 30., -finalPos.z) - smoothstep(40., 100., -finalPos.z)) + .01));
}