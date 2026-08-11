/* ==========================================================================
   MANGA BEDROOM INTERACTION & RAYCASTING MANAGER
   Handles camera fly-to cozy bedroom items and mouse look parallax
   ========================================================================== */

import * as THREE from 'three';
import gsap from 'gsap';
import { soundFx } from '../utils/audio.js';

export class MangaInteractionManager {
  constructor(sceneEngine, panelManager, onSelectCallback) {
    this.sceneEngine = sceneEngine;
    this.panelManager = panelManager;
    this.onSelectCallback = onSelectCallback;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
    this.hoveredGroup = null;
    this.selectedGroup = null;
    this.isAnimating = false;

    this.targetMousePos = { x: 0, y: 0 };
    this.currentMousePos = { x: 0, y: 0 };

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('click', (e) => this.onClick(e));
    window.addEventListener('touchstart', (e) => this.onTouch(e), { passive: true });
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.targetMousePos.x = (event.clientX / window.innerWidth - 0.5) * 2;
    this.targetMousePos.y = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  onTouch(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  onClick(event) {
    if (
      event.target.closest('#hud-header') ||
      event.target.closest('#hud-nav') ||
      event.target.closest('#portal-modal') ||
      event.target.closest('#loading-screen')
    ) {
      return;
    }

    if (this.hoveredGroup && !this.isAnimating) {
      this.selectGroup(this.hoveredGroup);
    }
  }

  getTopGroup(object) {
    let curr = object;
    while (curr && curr.parent && curr.parent !== this.panelManager.panelGroup) {
      curr = curr.parent;
    }
    return curr && curr.userData && curr.userData.chapterData ? curr : null;
  }

  selectGroup(itemGroup) {
    this.selectedGroup = itemGroup;
    const chapterData = itemGroup.userData.chapterData;

    soundFx.playSelect();
    this.isAnimating = true;

    const itemWorldPos = new THREE.Vector3();
    itemGroup.getWorldPosition(itemWorldPos);

    // Dynamic Camera Fly-to targeting bedroom item coordinates close-up
    const targetCamPos = itemWorldPos.clone();
    
    // Position camera dynamically inside room boundaries facing the item
    if (itemWorldPos.x < 0) {
      targetCamPos.x += 1.8;
    } else {
      targetCamPos.x -= 1.8;
    }
    
    // Zoom offset based on Ghibli bedroom item coordinates
    if (chapterData.itemType.startsWith('poster_')) {
      targetCamPos.z += 2.0;
      targetCamPos.y -= 0.1;
    } else {
      targetCamPos.z += 1.6;
      targetCamPos.y += 0.3;
    }

    // GSAP Camera Transition
    gsap.to(this.sceneEngine.camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.sceneEngine.camera.lookAt(itemWorldPos);
      },
      onComplete: () => {
        this.isAnimating = false;
        if (this.onSelectCallback) {
          this.onSelectCallback(chapterData);
        }
      }
    });
  }

  resetCamera() {
    soundFx.playBoom();
    this.isAnimating = true;
    this.selectedGroup = null;

    gsap.to(this.sceneEngine.camera.position, {
      x: this.sceneEngine.defaultCameraPos.x,
      y: this.sceneEngine.defaultCameraPos.y,
      z: this.sceneEngine.defaultCameraPos.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.sceneEngine.camera.lookAt(0, -0.5, -1.0);
      },
      onComplete: () => {
        this.isAnimating = false;
      }
    });
  }

  selectPanelById(id) {
    const found = this.panelManager.panels.find(
      (p) => p.userData.chapterData.id === id
    );
    if (found) {
      this.selectGroup(found);
    }
  }

  update() {
    if (!this.selectedGroup && !this.isAnimating) {
      this.sceneEngine.camera.position.copy(this.sceneEngine.defaultCameraPos);
      this.sceneEngine.camera.lookAt(0, -0.5, -1.0);
    }

    // Raycasting for interactive bedroom items
    if (!this.isAnimating) {
      this.raycaster.setFromCamera(this.mouse, this.sceneEngine.camera);
      const intersects = this.raycaster.intersectObjects(this.panelManager.panels, true);

      if (intersects.length > 0) {
        const topGroup = this.getTopGroup(intersects[0].object);

        if (topGroup && this.hoveredGroup !== topGroup) {
          if (this.hoveredGroup && this.hoveredGroup !== this.selectedGroup) {
            gsap.to(this.hoveredGroup.position, {
              y: this.hoveredGroup.userData.initialPos.y,
              duration: 0.3
            });
          }

          this.hoveredGroup = topGroup;
          soundFx.playHover();
          document.body.style.cursor = 'pointer';

          if (this.hoveredGroup !== this.selectedGroup) {
            gsap.to(this.hoveredGroup.position, {
              y: this.hoveredGroup.userData.initialPos.y + 0.15,
              duration: 0.3
            });
          }
        }
      } else {
        if (this.hoveredGroup && this.hoveredGroup !== this.selectedGroup) {
          gsap.to(this.hoveredGroup.position, {
            y: this.hoveredGroup.userData.initialPos.y,
            duration: 0.3
          });
        }
        this.hoveredGroup = null;
        document.body.style.cursor = 'default';
      }
    }
  }
}
