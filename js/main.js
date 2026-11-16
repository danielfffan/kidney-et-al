// main.js — mobile nav toggle + scroll reveal

// mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// photography: hover zoom-out to reveal the full, uncropped frame.
// Each img uses object-fit:contain; --cover-scale enlarges it to fill the tile.
document.querySelectorAll('.photo-tile img').forEach(img => {
  const tile = img.closest('.photo-tile');
  tile.style.setProperty('--photo', `url("${img.getAttribute('src')}")`);
  const setScale = () => {
    if (!img.naturalWidth || !tile.clientHeight) return;
    const imgAR = img.naturalWidth / img.naturalHeight;
    const tileAR = tile.clientWidth / tile.clientHeight;
    tile.style.setProperty('--cover-scale', Math.max(imgAR / tileAR, tileAR / imgAR).toFixed(4));
  };
  if (img.complete) setScale(); else img.addEventListener('load', setScale);
  window.addEventListener('resize', setScale);
});
