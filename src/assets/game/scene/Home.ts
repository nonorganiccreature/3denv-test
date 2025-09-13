import {
  BoxGeometry,
  CubeTextureLoader,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  Vector3,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export interface HomeSceneParams {
  canvas: HTMLCanvasElement
}

export class HomeScene extends Scene {
  mainCamera: PerspectiveCamera
  cameraControls: OrbitControls

  doorRoot: Group

  loading = false

  doorScale = 1

  constructor({ canvas }: HomeSceneParams) {
    super()

    this.mainCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    this.mainCamera.position.set(5, 10, 5)
    this.mainCamera.lookAt(0, 0, 0)

    this.doorRoot = new Group()
    this.add(this.doorRoot)

    this.initLights()
    this.initCubemap()
    this.initPrimitives()
    this.initGround()
    this.initDoor()

    this.cameraControls = new OrbitControls(this.mainCamera, canvas)
    this.cameraControls.target.set(0, 5, 0)
  }

  initCubemap() {
    const loader = new CubeTextureLoader()
    loader.setPath('/skybox/')

    const textureCube = loader.load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

    this.background = textureCube
  }

  initPrimitives() {
    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshPhongMaterial({ color: 0x0055ff })
    const cube = new Mesh(geometry, material)
    cube.castShadow = true

    cube.position.set(-2, 1.5, 3)

    this.add(cube)

    const torusGeomerty = new TorusGeometry()
    const torusMaterial = new MeshPhongMaterial({ color: 0xefef24 })
    const torus = new Mesh(torusGeomerty, torusMaterial)
    torus.position.set(1, 1.5, -1.5)
    torus.rotateY(Math.PI / 4)
    torus.receiveShadow = true
    torus.castShadow = true

    this.add(torus)
  }

  initLights() {
    const light = new DirectionalLight(0xffffff, 2)
    light.position.set(10, 5, 5)
    light.target.position.set(0, 0, 0)
    light.castShadow = true
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    this.add(light)
    this.add(light.target)
  }

  initGround() {
    const geometry = new PlaneGeometry(10, 10, 10, 10)
    const material = new MeshPhongMaterial({ color: 0xff8800, side: DoubleSide })

    const floor = new Mesh(geometry, material)
    floor.position.set(0, 0, 0)
    floor.receiveShadow = true

    floor.rotation.setFromQuaternion(
      new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2),
    )

    this.add(floor)
  }

  initDoor() {
    const doorTexture = new TextureLoader().load('/texture/door-texture.jpg')

    const geometry = new BoxGeometry(1, 2, 0.1)
    const material = new MeshPhongMaterial({ map: doorTexture })
    const door = new Mesh(geometry, material)
    door.castShadow = true

    const handleMaterial = new MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.6,
      roughness: 0.15,
    })

    const handleSphereGeometry = new SphereGeometry(0.05, 10, 10)
    const handleCubeGeometry = new BoxGeometry(0.02, 0.02, 0.2)

    const handleShpere = new Mesh(handleSphereGeometry, handleMaterial)
    const handleCube = new Mesh(handleCubeGeometry, handleMaterial)
    handleCube.position.set(0, 0, -0.1)

    const handleGroup = new Group()
    handleGroup.add(handleShpere)
    handleGroup.add(handleCube)

    this.doorRoot.add(door)
    this.doorRoot.add(handleGroup)

    this.doorRoot.position.set(1.5, 1, 0)
    handleGroup.position.set(0.4, 0, 0.15)

    this.doorRoot.traverse((obj) => {
      if ((obj as Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }

  updateDoorValues(value: number) {
    this.doorRoot.scale.set(value, value, 1)
    this.doorRoot.position.set(1.5, 1 * value, 0)
  }
}
