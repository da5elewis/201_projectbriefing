(function () {
  'use strict';

  // ── Theme toggle ────────────────────────────────────────
  var html   = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  var saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    html.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ── Add link feature ────────────────────────────────────
  var addBtn    = document.getElementById('addLinkBtn');
  var form      = document.getElementById('addLinkForm');
  var cancelBtn = document.getElementById('cancelBtn');
  var titleInput = document.getElementById('newTitle');
  var urlInput   = document.getElementById('newUrl');
  var formError  = document.getElementById('formError');
  var linksList  = document.querySelector('.links');

  var arrowSVG = '<svg class="link-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

  function openForm() {
    form.classList.add('is-open');
    form.setAttribute('aria-hidden', 'false');
    addBtn.setAttribute('aria-expanded', 'true');
    addBtn.classList.add('is-hidden');
    titleInput.focus();
  }

  function closeForm() {
    form.classList.remove('is-open');
    form.setAttribute('aria-hidden', 'true');
    addBtn.setAttribute('aria-expanded', 'false');
    addBtn.classList.remove('is-hidden');
    form.reset();
    formError.textContent = '';
  }

  function isValidUrl(str) {
    try {
      var u = new URL(str);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  function seedFromUrl(url) {
    // Derive a short alphanumeric seed from the URL for a stable picsum image
    return url.replace(/[^a-z0-9]/gi, '').slice(0, 16) || 'newlink';
  }

  function createLinkCard(title, url) {
    var seed  = seedFromUrl(url);
    var host  = '';
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (_) {}

    var a = document.createElement('a');
    a.className = 'link-card link-card--new';
    a.href      = url;
    a.target    = '_blank';
    a.rel       = 'noopener noreferrer';

    var img = document.createElement('img');
    img.className = 'link-thumb';
    img.src       = 'https://picsum.photos/seed/' + seed + '/120/120';
    img.alt       = '';
    img.loading   = 'lazy';

    var info = document.createElement('div');
    info.className = 'link-info';

    var source = document.createElement('span');
    source.className   = 'link-source';
    source.textContent = host;

    var titleEl = document.createElement('span');
    titleEl.className   = 'link-title';
    titleEl.textContent = title;

    info.appendChild(source);
    info.appendChild(titleEl);

    a.appendChild(img);
    a.appendChild(info);
    a.insertAdjacentHTML('beforeend', arrowSVG);

    return a;
  }

  addBtn.addEventListener('click', openForm);
  cancelBtn.addEventListener('click', closeForm);

  form.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeForm();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = titleInput.value.trim();
    var url   = urlInput.value.trim();

    if (!title) {
      formError.textContent = 'Please enter a title.';
      titleInput.focus();
      return;
    }
    if (!isValidUrl(url)) {
      formError.textContent = 'Please enter a valid URL starting with https://';
      urlInput.focus();
      return;
    }

    var card = createLinkCard(title, url);
    linksList.appendChild(card);

    // Animate in
    requestAnimationFrame(function () {
      card.classList.add('link-card--visible');
    });

    closeForm();
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

}());
