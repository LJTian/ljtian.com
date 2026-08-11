/* ==========================================================================
   GHIBLI COZY WATERCOLOR 3D SCENE - MANGA PANEL ROOM
   ========================================================================== */

import * as THREE from 'three';

export class MangaSceneEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 1. Scene & Background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#ffffff'); // Pure white background
    this.scene.fog = new THREE.FogExp2('#ffffff', 0.015);

    // 2. Camera positioned high in the corner INSIDE the room (ceiling is at y=3, left wall x=-6, front wall z=4)
    this.camera = new THREE.PerspectiveCamera(65, this.width / this.height, 0.1, 1000);
    this.defaultCameraPos = new THREE.Vector3(-5.8, 2.8, 3.8); // just inside the corner
    this.camera.position.copy(this.defaultCameraPos);
    this.camera.lookAt(new THREE.Vector3(2, -2, -1.5)); // Look down towards the center/top-right

    // 3. Renderer with soft shadows
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Build Room Structure
    this.roomGroup = new THREE.Group();
    this.scene.add(this.roomGroup);
    this.buildWhiteMangaRoom();

    // 5. Global Lighting
    this.setupGlobalLighting();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  buildWhiteMangaRoom() {
    // Room dimensions (Width: 12, Depth: 8, Height: 6)
    const w = 12;
    const h = 6;
    const d = 8;
    const floorY = -3;

    // Pure white materials (DoubleSide so we see inside)
    const wallMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.9, side: THREE.DoubleSide });
    const sketchOutlineMat = new THREE.LineBasicMaterial({ color: '#222222', linewidth: 3 });

    // A. Floor
    const floorGeo = new THREE.PlaneGeometry(w, d);
    const floor = new THREE.Mesh(floorGeo, wallMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = floorY;
    floor.receiveShadow = true;
    this.roomGroup.add(floor);

    // Subtle grid on floor
    const floorGrid = new THREE.GridHelper(w, 12, '#e0e0e0', '#f0f0f0');
    floorGrid.position.y = floorY + 0.01;
    this.roomGroup.add(floorGrid);

    // B. Walls
    // Back Wall
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
    backWall.position.set(0, floorY + h / 2, -d / 2);
    backWall.receiveShadow = true;
    this.roomGroup.add(backWall);

    // Front Wall
    const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
    frontWall.position.set(0, floorY + h / 2, d / 2);
    frontWall.rotation.y = Math.PI;
    frontWall.receiveShadow = true;
    this.roomGroup.add(frontWall);

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wallMat);
    leftWall.position.set(-w / 2, floorY + h / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    this.roomGroup.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(d, h), wallMat);
    rightWall.position.set(w / 2, floorY + h / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    this.roomGroup.add(rightWall);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(w, d);
    const ceiling = new THREE.Mesh(ceilingGeo, wallMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = floorY + h;
    ceiling.receiveShadow = true;
    this.roomGroup.add(ceiling);

    // Sketch Room Outline
    const wallOutlineGeo = new THREE.BoxGeometry(w, h, d);
    const edges = new THREE.EdgesGeometry(wallOutlineGeo);
    const wallWire = new THREE.LineSegments(edges, sketchOutlineMat);
    wallWire.position.y = floorY + h / 2;
    this.roomGroup.add(wallWire);
  }

  setupGlobalLighting() {
    // Soft overall ambient light
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.85);
    this.scene.add(ambientLight);

    // Directional light casting shadows from top-right to bottom-left
    const dirLight = new THREE.DirectionalLight('#ffffff', 1.2);
    dirLight.position.set(8, 12, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -10;
    dirLight.shadow.camera.right = 10;
    dirLight.shadow.camera.top = 10;
    dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);

    // Soft fill light
    const fillLight = new THREE.PointLight('#f5f5f5', 0.5, 20);
    fillLight.position.set(-5, 5, 5);
    this.scene.add(fillLight);
  }

  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  update(elapsedTime) {
    // Dynamic scene updates if needed
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
