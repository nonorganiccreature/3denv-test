import { WebGLRenderer } from 'three'
import { HomeScene } from './scene'
import GUI from 'lil-gui'

export class GameApplication {
  renderer?: WebGLRenderer

  homeScene!: HomeScene

  gui!: GUI

  renderRequested = false

  constructor() {}

  initializeApplication(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true

    const bindRender = this.requestRenderIfNotRequested.bind(this)

    this.homeScene = new HomeScene({ canvas })

    this.homeScene.cameraControls.addEventListener('change', bindRender)
    this.homeScene.cameraControls.enableDamping = true
    this.homeScene.cameraControls.update()

    window.addEventListener('resize', bindRender)
    window.addEventListener('load', bindRender)

    this.initGUI()
  }

  resizeRendererToDisplaySize(renderer: WebGLRenderer) {
    const canvas = renderer.domElement
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height

    if (needResize) {
      renderer.setSize(width, height, true)
    }

    return needResize
  }

  render() {
    this.renderRequested = false

    if (this.renderer && this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement
      this.homeScene.mainCamera.aspect = canvas.clientWidth / canvas.clientHeight
      this.homeScene.mainCamera.updateProjectionMatrix()
    }

    if (this.renderer) {
      this.homeScene.cameraControls.update()
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

  requestRenderIfNotRequested() {
    if (!this.renderRequested) {
      this.renderRequested = true
      requestAnimationFrame(this.render.bind(this))
    }
  }
}
