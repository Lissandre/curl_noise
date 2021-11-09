import { BufferAttribute, BufferGeometry, NoBlending, Object3D, Points, ShaderMaterial, SubtractiveBlending } from 'three'
import fragment from '@shaders/fragment.glsl'
import vertex from '@shaders/vertex.glsl'

export default class Floor {
  constructor(options) {
    // Set options
    this.time = options.time

    // Set up
    this.container = new Object3D()
    this.container.name = 'Floor'
    this.params = {
      lines: 100,
      columns: 150,
      separation: 1
    }

    this.createParticles()
    this.setMovement()
  }
  createParticles() {
    const initPositions = new Float32Array(this.params.lines * this.params.columns * 3)
    let v = 0

    for (let i = 0; i < this.params.lines; i++) {
      for (let j = 0; j < this.params.columns; j++) {
        initPositions[v] = j * this.params.separation - (this.params.columns * this.params.separation) / 2 // x
        initPositions[v + 1] = 0 // y
        initPositions[v + 2] = -i * this.params.separation // z

        v += 3
      }
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(initPositions, 3))

    const material = new ShaderMaterial({
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: SubtractiveBlending,
      uniforms: {
        u_time: { value: this.time.t_clock.getElapsedTime()},
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.points = new Points(geometry, material)
    this.container.add(this.points)
  }
  setMovement() {
    this.time.on('tick', () => {
      this.points.material.uniforms.u_time.value = this.time.t_clock.getElapsedTime()
    })
  }
}
