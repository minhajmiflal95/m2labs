// Original procedural artwork for the studio's concept projects.
// Run scripts/generate-art.mjs against the dev server to regenerate the PNG files.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function renderArtwork(kind) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(1200, 1000);
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  let camera;
  const add = (geo, mat, position, rotation) => {
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    if (rotation) mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
  };
  if (kind === "forma") {
    scene.background = new THREE.Color("#c0c8bd");
    camera = new THREE.PerspectiveCamera(39, 1.2, 0.1, 100);
    camera.position.set(6, 4.7, 10);
    camera.lookAt(-0.3, 1.9, -1.5);
    const stone = new THREE.MeshStandardMaterial({
      color: "#bfc1ac",
      roughness: 0.95,
      metalness: 0,
    });
    const floor = new THREE.MeshStandardMaterial({
      color: "#c5c5b7",
      roughness: 0.95,
    });
    add(
      new THREE.PlaneGeometry(100, 100),
      floor,
      [0, -0.01, 0],
      [-Math.PI / 2, 0, 0],
    );
    for (let i = 0; i < 5; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(-2, 0);
      shape.lineTo(2, 0);
      shape.lineTo(2, 5.6);
      shape.lineTo(-2, 5.6);
      shape.closePath();
      const hole = new THREE.Path();
      hole.moveTo(-1.2, 0);
      hole.lineTo(-1.2, 2.7);
      hole.absarc(0, 2.7, 1.2, Math.PI, 0, true);
      hole.lineTo(1.2, 0);
      hole.closePath();
      shape.holes.push(hole);
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.42,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.035,
        bevelSegments: 3,
        curveSegments: 48,
      });
      add(geometry, stone, [0, 0, -i * 2.5]);
    }
    add(new THREE.BoxGeometry(2.4, 1.0, 1.0), stone, [3.6, 0.5, -1.5]);
    add(
      new THREE.SphereGeometry(0.62, 64, 32),
      new THREE.MeshStandardMaterial({ color: "#535f4d", roughness: 0.72 }),
      [3.6, 1.62, -1.5],
    );
    const sun = new THREE.DirectionalLight("#fff3d9", 5);
    sun.position.set(-5, 9, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -12;
    sun.shadow.camera.right = 12;
    sun.shadow.camera.top = 12;
    sun.shadow.camera.bottom = -12;
    sun.shadow.normalBias = 0.025;
    scene.add(sun);
    scene.add(new THREE.AmbientLight("#dce6dd", 0.55));
  } else {
    scene.background = new THREE.Color("#27679e");
    camera = new THREE.PerspectiveCamera(38, 1.2, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    camera.lookAt(0, 0, 0);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#4aa6e4",
      metalness: 1,
      roughness: 0.16,
      clearcoat: 1,
      envMapIntensity: 1.7,
    });
    const silver = new THREE.MeshPhysicalMaterial({
      color: "#c7dfed",
      metalness: 1,
      roughness: 0.2,
      clearcoat: 1,
      envMapIntensity: 1.5,
    });
    const geometry = new THREE.TorusGeometry(1.8, 0.51, 40, 160);
    add(geometry, material, [-1.75, -1.2, 0], [0.5, -0.65, -0.4]);
    add(geometry, silver, [1.8, 1.55, -1.5], [1.05, 0.2, 0.3]);
    add(new THREE.SphereGeometry(0.6, 64, 32), material, [1.85, -1.55, 1]);
    const light = new THREE.DirectionalLight("#e1f1ff", 4);
    light.position.set(-3, 5, 5);
    scene.add(light);
  }
  renderer.render(scene, camera);
  const data = renderer.domElement.toDataURL("image/png");
  scene.traverse((obj) => {
    obj.geometry?.dispose();
    if (obj.material) {
      const materials = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];
      materials.forEach((m) => m.dispose());
    }
  });
  env.dispose();
  room.dispose();
  pmrem.dispose();
  renderer.dispose();
  return data;
}
