/* ==========================================================================
   MANGA HUD & UI CONTROLLER
   Manages search input, audio toggles, bottom chapter chips & manga modal cards
   ========================================================================== */

import { soundFx } from '../utils/audio.js';

export class MangaHUDController {
  constructor(panelManager, interactionManager, sceneEngine) {
    this.panelManager = panelManager;
    this.interactionManager = interactionManager;
    this.sceneEngine = sceneEngine;

    // Elements
    this.searchInput = document.getElementById('manga-search');
    this.audioToggleBtn = document.getElementById('audio-toggle');
    this.resetBtn = document.getElementById('reset-view-btn');
    this.navChips = document.querySelectorAll('.manga-chip');

    // Modal elements
    this.modal = document.getElementById('portal-modal');
    this.modalClose = document.getElementById('modal-close');
    this.modalBadge = document.getElementById('modal-badge');
    this.modalTitle = document.getElementById('modal-title');
    this.modalTagline = document.getElementById('modal-tagline');
    this.modalBody = document.getElementById('modal-body-content');
    this.modalActionLink = document.getElementById('modal-action-link');
    this.modalBackBtn = document.getElementById('modal-back-btn');

    this.initEvents();
  }

  initEvents() {
    // 1. Audio Toggle
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', () => {
        const isEnabled = soundFx.toggleSound();
        const iconSpan = this.audioToggleBtn.querySelector('.btn-icon');
        const labelSpan = this.audioToggleBtn.querySelector('.btn-label');
        if (isEnabled) {
          if (iconSpan) iconSpan.textContent = '🔊';
          if (labelSpan) labelSpan.textContent = '音效开启';
          soundFx.playHover();
        } else {
          if (iconSpan) iconSpan.textContent = '🔇';
          if (labelSpan) labelSpan.textContent = '音效静音';
        }
      });
    }

    // 2. Reset View Button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.closeModal();
        this.interactionManager.resetCamera();
        this.updateActiveNavChip('all');
      });
    }

    // 3. Search Filter
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.filterPanels(query);
      });
    }

    // 4. Nav Chips Click
    this.navChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const chapterId = chip.getAttribute('data-chapter-id');
        this.updateActiveNavChip(chapterId);
        soundFx.playPageFlip();

        if (chapterId === 'all') {
          this.closeModal();
          this.interactionManager.resetCamera();
        } else {
          this.interactionManager.selectPanelById(chapterId);
        }
      });
    });

    // 5. Modal Close Buttons
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => {
        soundFx.playPageFlip();
        this.closeModal();
      });
    }

    if (this.modalBackBtn) {
      this.modalBackBtn.addEventListener('click', () => {
        soundFx.playPageFlip();
        this.closeModal();
        this.interactionManager.resetCamera();
      });
    }

    // Close on backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          soundFx.playPageFlip();
          this.closeModal();
        }
      });
    }
  }

  filterPanels(query) {
    this.panelManager.panels.forEach((panel) => {
      const data = panel.userData.chapterData;
      const match =
        !query ||
        data.title.toLowerCase().includes(query) ||
        data.tagline.toLowerCase().includes(query) ||
        data.episode.toLowerCase().includes(query) ||
        data.badge.toLowerCase().includes(query);

      panel.visible = match;
    });
  }

  updateActiveNavChip(chapterId) {
    this.navChips.forEach((chip) => {
      const id = chip.getAttribute('data-chapter-id');
      if (id === chapterId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  openModal(data) {
    if (!this.modal) return;

    this.modalBadge.textContent = `${data.episode} • ${data.badge}`;

    this.modalTitle.textContent = `${data.icon} ${data.title}`;
    this.modalTagline.textContent = data.tagline;

    // Render articles HTML
    let articlesHtml = '<div class="manga-article-list">';
    if (data.articles && data.articles.length > 0) {
      data.articles.forEach((art, idx) => {
        articlesHtml += `
          <a href="${art.url}" target="_blank" class="manga-article-card">
            <div class="art-num">0${idx + 1}</div>
            <div class="art-details">
              <div class="art-title">${art.title}</div>
              <div class="art-date">📅 ${art.date}</div>
            </div>
            <div class="art-arrow">READ →</div>
          </a>
        `;
      });
    } else {
      articlesHtml += '<p class="no-articles">暂无特定章回文章，点击下方查看全站专栏。</p>';
    }
    articlesHtml += '</div>';

    this.modalBody.innerHTML = articlesHtml;
    this.modalActionLink.href = 'https://ljtian.com';

    this.modal.classList.remove('hidden');
    this.updateActiveNavChip(data.id);
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
  }
}
