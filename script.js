(function () {
  'use strict';

  var html   = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  // Restore saved preference on load
  var saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    html.setAttribute('data-theme', saved);
  }

  toggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}());
