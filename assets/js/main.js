// K K Marketing — shared behaviour (all pages)
const WHATSAPP = '910000000000'; // TODO: real WhatsApp number, country code first, digits only

document.getElementById('yr').textContent = new Date().getFullYear();

// Overlay scrollbar (mouse/trackpad only; touch keeps the native one)
if (matchMedia('(pointer: fine)').matches) {
  const root = document.documentElement, thumb = document.createElement('div');
  thumb.className = 'sb-thumb'; thumb.setAttribute('aria-hidden', 'true');
  document.body.appendChild(thumb); root.classList.add('sb');
  const sync = () => {
    const view = innerHeight, full = root.scrollHeight, h = Math.max(view * view / full, 40);
    thumb.style.height = h + 'px';
    thumb.style.transform = `translateY(${scrollY / (full - view) * (view - h)}px)`;
    thumb.style.display = full > view ? '' : 'none';
  };
  addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync);
  new ResizeObserver(sync).observe(document.body);
  thumb.addEventListener('pointerdown', e => {
    const y0 = e.clientY, s0 = scrollY;
    const ratio = (root.scrollHeight - innerHeight) / (innerHeight - thumb.offsetHeight);
    thumb.setPointerCapture(e.pointerId); thumb.classList.add('drag');
    root.style.scrollBehavior = 'auto';
    const move = ev => scrollTo(0, s0 + (ev.clientY - y0) * ratio);
    thumb.addEventListener('pointermove', move);
    thumb.addEventListener('pointerup', () => {
      thumb.removeEventListener('pointermove', move); thumb.classList.remove('drag'); root.style.scrollBehavior = '';
    }, { once: true });
    e.preventDefault();
  });
  sync();
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (!e.isIntersecting) return;
    setTimeout(() => e.target.classList.add('in'), i * 70);
    io.unobserve(e.target);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Enquiry → WhatsApp
document.getElementById('enquiry')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const name = (f.get('name') || '').trim();
  const phone = (f.get('phone') || '').trim();
  if (!name || !phone) {
    e.target.querySelector(name ? '[name=phone]' : '[name=name]').focus();
    return;
  }
  const msg = `Hi K K Marketing, I'm ${name} (${phone}).\nBuying for: ${f.get('type')}\nNeed: ${(f.get('need') || '').trim() || '—'}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
