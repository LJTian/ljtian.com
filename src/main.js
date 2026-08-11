/* ==========================================================================
   MANGA 3D TECH PORTAL - MAIN APPLICATION ENTRYPOINT
   ========================================================================== */
import * as THREE from 'three';
import { MangaSceneEngine } from './3d/scene.js';
import { MangaPanelManager } from './3d/mangaPanels.js';
import { MangaInteractionManager } from './3d/interaction.js';
import { MangaHUDController } from './ui/hud.js';
import { soundFx } from './utils/audio.js';

class MangaApp {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.loadingScreen = document.getElementById('loading-screen');
    this.progressBar = document.getElementById('progress-bar');
    this.loadingText = document.getElementById('loading-text');
    this.enterBtn = document.getElementById('enter-btn');

    this.sceneEngine = null;
    this.panelManager = null;
    this.interactionManager = null;
    this.hudController = null;

    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Simulate Manga Loader
    this.simulateLoading(() => {
      // 2. Initialize 3D Engine & Managers
      this.sceneEngine = new MangaSceneEngine(this.canvas);
      this.panelManager = new MangaPanelManager(this.sceneEngine.scene);
      this.interactionManager = new MangaInteractionManager(
        this.sceneEngine,
        this.panelManager,
        (data) => this.onPanelSelected(data)
      );
      this.hudController = new MangaHUDController(
        this.panelManager,
        this.interactionManager,
        this.sceneEngine
      );

      // Start render loop
      this.animate();
    });
  }

  simulateLoading(onComplete) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 18) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        this.progressBar.style.width = '100%';
        this.loadingText.textContent = '100%';

        setTimeout(() => {
          this.loadingText.classList.add('hidden');
          this.enterBtn.classList.remove('hidden');

          const startApp = () => {
            soundFx.playSelect();
            this.loadingScreen.classList.add('fade-out');
            if (onComplete) onComplete();
          };

          this.enterBtn.addEventListener('click', startApp);
          window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (!this.loadingScreen.classList.contains('fade-out')) {
                startApp();
              }
            }
          }, { once: true });
        }, 200);
      } else {
        this.progressBar.style.width = `${progress}%`;
        this.loadingText.textContent = `${progress}%`;
      }
    }, 70);
  }

  onPanelSelected(data) {
    if (this.hudController) {
      this.hudController.openModal(data);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();
    const deltaTime = this.clock.getDelta();

    // 1. Update Scene Engine (Speed lines & dust)
    if (this.sceneEngine) {
      this.sceneEngine.update(elapsedTime);
    }

    // 2. Update Manga Panel Animations
    if (this.panelManager) {
      this.panelManager.update(deltaTime);
    }

    // 3. Update Controls & Interaction
    if (this.interactionManager) {
      this.interactionManager.update();
    }

    // 4. Render 3D Scene
    if (this.sceneEngine) {
      this.sceneEngine.render();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new MangaApp();
});
