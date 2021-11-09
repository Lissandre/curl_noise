precision highp float;
varying float vAlpha;
varying vec2 vUv;
varying vec3 noisy;
varying vec3 finalPos;

void main()
{
  vec2 uv = gl_PointCoord;

  float dist = distance(uv, vec2(0.5));
  float circle = smoothstep(max(0., 0.49 - ((smoothstep(10., 30., -finalPos.z) - smoothstep(40., 100., -finalPos.z)) + .01) / 9.), 0.5, dist);

  float alpha = max(0., smoothstep(0., 1., 1. - circle - vAlpha));
  gl_FragColor = vec4(vec3(1.), alpha);
}