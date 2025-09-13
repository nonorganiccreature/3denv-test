import { WebGLRenderer } from 'three'
import { HomeScene } from './scene'
import GUI from 'lil-gui'

export class GameApplication {
  renderer?: WebGLRenderer

  homeScene!: HomeScene

  gui!: GUI

  constructor() {}

  initializeApplication(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true

    const bindRender = this.render.bind(this)

    this.homeScene = new HomeScene({ canvas })

    this.homeScene.cameraControls.addEventListener('change', bindRender)
    window.addEventListener('resize', bindRender)
    window.addEventListener('load', bindRender)

    this.homeScene.cameraControls.update()

    this.initGUI()
  }

  render() {
    if (this.renderer) {
      this.renderer.render(this.homeScene, this.homeScene.mainCamera)
    }
  }

  initGUI() {
    this.gui = new GUI()

    this.gui.title('Параметры двери')

    const t1 = this.gui.add(
      {
        WidthScaleDoor: 1,
      },
      'WidthScaleDoor',
      1,
      10,
    )
    t1.name('Размер двери')

    this.gui.onChange((a) => {
      if (a.property === 'WidthScaleDoor') {
        this.homeScene.updateDoorValues(a.value)
      }

      this.render()
    })
  }
}
