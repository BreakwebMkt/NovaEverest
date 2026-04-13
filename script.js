const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const heroBg = document.querySelector('.hero-bg[data-bg-images]');
if (heroBg) {
  const images = (heroBg.getAttribute('data-bg-images') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const paintHero = (imagePath) => {
    heroBg.style.backgroundImage =
      `linear-gradient(90deg, hsl(var(--navy) / 0.95), hsl(var(--navy) / 0.8), hsl(var(--navy) / 0.6)), url('${imagePath}')`;
  };

  if (images.length > 0) {
    let current = 0;
    paintHero(images[current]);

    if (images.length > 1) {
      setInterval(() => {
        heroBg.classList.add('is-fading');
        setTimeout(() => {
          current = (current + 1) % images.length;
          paintHero(images[current]);
          heroBg.classList.remove('is-fading');
        }, 320);
      }, 5000);
    }
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${index % 6 * 0.08}s`;
  observer.observe(el);
});

const whatsappForm = document.getElementById('whatsapp-form');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(whatsappForm);
    const nome = String(formData.get('nome') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const telefone = String(formData.get('telefone') || '').trim();
    const mensagem = String(formData.get('mensagem') || '').trim();

    const texto = [
      `Ola! Me chamo ${nome}.`,
      email ? `Email: ${email}.` : '',
      telefone ? `Telefone: ${telefone}.` : '',
      mensagem,
    ]
      .filter(Boolean)
      .join(' ');

    const url = `https://wa.me/551120282005?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  });
}
