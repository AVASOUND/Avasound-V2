import * as THREE from 'three-js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function Canvas() {
  const scene = new THREE.Scene()
  const controls = new OrbitControls(camera, renderer.domElement)

  let test
  const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64)
  const planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true })
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
  planeMesh.rotation.x = -Math.PI / 2 + Math.PI / 4
  planeMesh.scale.x = 2
  planeMesh.scale.y = 2
  planeMesh.scale.z = 2
  planeMesh.position.y = 8
  test.scene.add(planeMesh)

  useEffect(() => {
    test = new SceneInit('avsoCanvas')
    test.initScene()
    test.animate()
  }, [])

  return (
    <div>
      <canvas id="avsoCanvas"></canvas>
    </div>
  )
}
