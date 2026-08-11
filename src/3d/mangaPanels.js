/* ==========================================================================
   GHIBLI COZY WATERCOLOR 3D SCENE - MANGA PANELS -> ROOM ITEMS
   Manages the 3D items inside the room (Placeholders & GLTF Models)
   ========================================================================== */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const MANGA_CHAPTERS = [
  {
    id: 'bed',
    episode: '第 01 话',
    title: '床铺·梦境与灵感',
    tagline: 'Rest / Dreams / 个人简介与技术愿景',
    icon: '🛌',
    sfxText: '呼噜噜...',
    badge: 'BEDROOM',
    modelUrl: '', // Loaded from public/models/
    modelScale: 3.5, // TripoSR models are usually unit size (1.0), adjust scale to match placeholder
    boxSize: [4.0, 1.2, 7.0],
    modelPos: [-4.0, -2.4, -0.5], // x, y, z
    color: '#bae2fc',
    articles: [
      { title: 'LJTian 的个人简介与全栈技术路线图', date: '2026-08-01', url: 'https://ljtian.com' },
      { title: '梦境中的架构思考：Agentic AI', date: '2026-07-20', url: 'https://ljtian.com' }
    ]
  },
  {
    id: 'desk',
    episode: '第 02 话',
    title: '电脑桌·硬核输出',
    tagline: 'Code / Architecture / 核心代码与工程实践',
    icon: '💻',
    sfxText: '噼里啪啦！',
    badge: 'WORKSTATION',
    modelUrl: '',
    modelScale: 4.0,
    boxSize: [5.0, 2.5, 2.0],
    modelPos: [1.0, -1.75, -3.0], 
    color: '#f5af19',
    articles: [
      { title: '百万级并发 Go Channel 与锁竞争性能优化', date: '2026-06-10', url: 'https://ljtian.com' },
      { title: '基于 Go 打造高性能微服务 RPC 框架', date: '2026-04-19', url: 'https://ljtian.com' }
    ]
  },
  {
    id: 'chair',
    episode: '第 03 话',
    title: '椅子·沉浸思考',
    tagline: 'Focus / Linux / 系统底层与容器隔离',
    icon: '💺',
    sfxText: '吱呀——',
    badge: 'FOCUS',
    modelUrl: '',
    modelScale: 2.0,
    boxSize: [1.2, 1.8, 1.2],
    modelPos: [1.0, -2.1, -1.0], 
    color: '#88b04b',
    articles: [
      { title: '从零理解 Linux Cgroups 与 Namespace', date: '2026-05-08', url: 'https://ljtian.com' },
      { title: 'Docker 镜像多阶段构建瘦身最佳实践', date: '2026-06-25', url: 'https://ljtian.com' }
    ]
  },
  {
    id: 'camera',
    episode: '第 04 话',
    title: '相机·记录生活',
    tagline: 'Photography / Memories / 生活切片与感悟',
    icon: '📷',
    sfxText: '咔嚓！',
    badge: 'MEMORIES',
    modelUrl: '',
    modelScale: 1.5,
    boxSize: [1.0, 1.0, 1.0],
    modelPos: [4.5, -2.5, -3.5], 
    color: '#41b3a3',
    articles: [
      { title: '期待自己成为一个很酷的人，拥有精彩人生', date: '2026-05-01', url: 'https://ljtian.com' },
      { title: '摄影随笔：捕捉城市里的光与影', date: '2026-04-12', url: 'https://ljtian.com' }
    ]
  },
  {
    id: 'bicycle',
    episode: '第 05 话',
    title: '自行车·探索世界',
    tagline: 'Travel / English / 全球化视野与持续学习',
    icon: '🚲',
    sfxText: '叮铃铃~',
    badge: 'EXPLORE',
    modelUrl: '',
    modelScale: 3.0,
    boxSize: [1.2, 2.5, 3.5],
    modelPos: [5.0, -1.75, 0.0], 
    color: '#e8a87c',
    articles: [
      { title: 'Reading System Papers in English: Effective Approaches', date: '2026-07-10', url: 'https://ljtian.com' },
      { title: '骑行百公里：穿越城市的边界', date: '2026-06-01', url: 'https://ljtian.com' }
    ]
  },
  {
    id: 'door',
    episode: '第 06 话',
    title: '门·连接未来',
    tagline: 'Portal / Open Source / 开源贡献与外部世界',
    icon: '🚪',
    sfxText: '吱呀——',
    badge: 'PORTAL',
    modelUrl: '',
    modelScale: 3.5,
    boxSize: [0.2, 4.0, 2.0], // Thinner door
    modelPos: [5.9, -1.0, 2.5], // Moved closer to the wall edge and slightly up along Z
    color: '#d2b48c',
    articles: [
      { title: 'GitHub / Blog 维护感悟与开源贡献', date: '2026-06-30', url: 'https://ljtian.com' },
      { title: '2027年技术趋势展望：云原生与AI的融合', date: '2026-08-02', url: 'https://ljtian.com' }
    ]
  }
];

export class MangaPanelManager {
  constructor(scene) {
    this.scene = scene;
    this.panels = [];
    this.panelGroup = new THREE.Group();
    this.scene.add(this.panelGroup);
    
    this.gltfLoader = new GLTFLoader();
    this.mixers = [];

    this.createMangaPanels();
  }

  createMangaPanels() {
    // Placeholder Material (Semi-transparent white)
    const placeholderMat = new THREE.MeshStandardMaterial({ 
      color: '#ffffff', 
      transparent: true,
      opacity: 0.5,
      roughness: 0.2
    });
    
    // Thick black sketch outlines for placeholders
    const sketchOutlineMat = new THREE.LineBasicMaterial({ 
      color: '#222222', 
      linewidth: 3 
    });

    MANGA_CHAPTERS.forEach((chapter, index) => {
      const itemGroup = new THREE.Group();
      
      // Position the group according to layout
      itemGroup.position.fromArray(chapter.modelPos);

      // Build the Placeholder Box
      const boxGeo = new THREE.BoxGeometry(chapter.boxSize[0], chapter.boxSize[1], chapter.boxSize[2]);
      const box = new THREE.Mesh(boxGeo, placeholderMat);
      box.receiveShadow = true;
      box.castShadow = true;
      
      // Edges for the comic border
      const edges = new THREE.EdgesGeometry(boxGeo);
      const outline = new THREE.LineSegments(edges, sketchOutlineMat);
      
      const placeholderGroup = new THREE.Group();
      placeholderGroup.add(box);
      placeholderGroup.add(outline);
      itemGroup.add(placeholderGroup);

      // Load the GLTF Model if URL is provided
      if (chapter.modelUrl && chapter.modelUrl !== '') {
        this.gltfLoader.load(chapter.modelUrl, (gltf) => {
          const model = gltf.scene;
          model.scale.setScalar(chapter.modelScale);
          
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          // Replace placeholder with the loaded model
          itemGroup.add(model);
          itemGroup.remove(placeholderGroup);
          
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
            this.mixers.push(mixer);
          }
        }, undefined, (error) => {
          console.error('Error loading model', chapter.modelUrl, error);
        });
      }

      // Metadata for camera interaction
      itemGroup.userData = {
        chapterData: chapter,
        initialPos: itemGroup.position.clone(),
        initialRot: itemGroup.rotation.clone(),
        index: index
      };

      this.panelGroup.add(itemGroup);
      this.panels.push(itemGroup);
    });
  }

  update(deltaTime) {
    // Update all animation mixers
    this.mixers.forEach(mixer => mixer.update(deltaTime));
  }
}
