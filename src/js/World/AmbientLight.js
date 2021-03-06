import { Object3D, AmbientLight, Color } from 'three'

export default class AmbientLightSource {
  constructor(options) {
    // Set options
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Ambient Light'
    this.params = { color: 0x555555 }

    this.createAmbientLight()

    if (this.debug) {
      this.setDebug()
    }
  }
  createAmbientLight() {
    this.light = new AmbientLight(this.params.color, 1)
    this.container.add(this.light)
  }
  setDebug() {
    this.debugFolder = this.debug.addFolder({
      title: 'Ambient Light',
      expanded: false
    })
    this.debugFolder
      .addInput(this.params, 'color', {
        view: 'color',
        expanded: false,
        picker: 'inline',
      })
      .on('change', () => {
        this.light.color = new Color(this.params.color)
      })
  }
}
