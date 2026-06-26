(() => {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const closeBtns = modal.querySelectorAll('.modal__close');
  const topbar = modal.querySelector('.modal__topbar');

  const imgEl = document.getElementById('m-photo');
  const nameEl = document.getElementById('m-name');
  const nameMobileEl = document.getElementById('m-name-mobile');
  const titleEl = document.getElementById('m-title');
  const infoEl = document.getElementById('m-info');
  const actionsEl = document.getElementById('m-actions');
  const bodyEl = modal.querySelector('.modal__body');

  const isEn = document.documentElement.lang === 'en';

  const label = isEn ? {
    degree: 'Degree: ',
    office: 'Office: ',
    fields: 'Research Areas: ',
    expertise: 'Expertise: ',
    experience: 'Experience: ',
    phone: 'Phone: ',
    email: 'Email: ',
    website: 'Website: ',
    cv: 'CV: '
  } : {
    degree: '最高學歷：',
    office: 'Office：',
    fields: '研究領域：',
    expertise: '研究專長：',
    experience: '研究經歷：',
    phone: '電話：',
    email: '信箱：',
    website: '個人網站：',
    cv: '簡歷：'
  };

  let _scrollY = 0;
  function lockBodyScroll() {
    _scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.setProperty('--scroll-lock', `-${_scrollY}px`);
    document.body.classList.add('no-scroll');
  }
  function unlockBodyScroll() {
    document.body.classList.remove('no-scroll');
    document.body.style.removeProperty('--scroll-lock');
    window.scrollTo(0, _scrollY);
    document.documentElement.style.scrollBehavior = '';
  }

  function withLineBreaks(str) {
    return (str || '').replace(/\n/g, '<br>');
  }

  function openModalFromCard(card) {
    const data = {
      name: card.dataset.name || '',
      title: card.dataset.title || '',
      degree: card.dataset.degree || '',
      office: card.dataset.office || '',
      fields: card.dataset.fields || '',
      expertise: card.dataset.expertise || '',
      experience: card.dataset.experience || '',
      phone: card.dataset.phone || '',
      email: card.dataset.email || '',
      website: card.dataset.website || '',
      cv: card.dataset.cv || '',
      photo: card.dataset.photo || card.querySelector('img')?.src || ''
    };

    imgEl.src = data.photo;
    imgEl.alt = data.name ? (isEn ? `${data.name} photo` : `${data.name} 的照片`) : 'Profile photo';
    nameEl.textContent = data.name;
    if (nameMobileEl) nameMobileEl.textContent = data.name;
    titleEl.textContent = data.title;

    infoEl.innerHTML = '';
    if (actionsEl) actionsEl.innerHTML = '';

    const rows = [
      ['degree', data.degree],
      ['office', data.office],
      ['fields', data.fields],
      ['expertise', data.expertise],
      ['experience', data.experience],
      ['phone', data.phone],
      ['email', data.email],
      ['website', data.website],
      ['cv', data.cv]
    ];

    rows.forEach(([key, val]) => {
      if (!val) return;
      const p = document.createElement('p');
      const content = withLineBreaks(val);

      if (key === 'email') {
        p.innerHTML = `<strong>${label[key]}</strong><a href="mailto:${content}">${content}</a>`;
      } else if (key === 'website' || key === 'cv') {
        if (/^https?:\/\//i.test(content)) {
          p.innerHTML = `<strong>${label[key]}</strong><a href="${content}" target="_blank" rel="noopener">${content}</a>`;
        } else {
          p.innerHTML = `<strong>${label[key]}</strong>${content}`;
        }
      } else {
        p.innerHTML = `<strong>${label[key]}</strong>${content}`;
      }
      infoEl.appendChild(p);
    });

    if (window.matchMedia('(max-width: 720px)').matches) {
      if (topbar) topbar.style.display = 'flex';
    } else {
      if (topbar) topbar.style.display = 'none';
    }

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    lockBodyScroll();

    if (bodyEl) bodyEl.scrollTop = 0;

    document.addEventListener('keydown', escToClose);
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
    document.removeEventListener('keydown', escToClose);
  }
  function escToClose(e) { if (e.key === 'Escape') closeModal(); }

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  panel.addEventListener('click', e => e.stopPropagation());
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('touchmove', (e) => {
    if (!e.target.closest('.modal__panel')) e.preventDefault();
  }, { passive: false });

  const clickableCards = document.querySelectorAll('.person-card.profile');
  clickableCards.forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
  });
})();
