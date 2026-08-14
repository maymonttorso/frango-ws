JS
document.addEventListener('DOMContentLoaded', () => {
 
  // ===== CARROSSEL DOS CARDS DO CARDÁPIO =====
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.car-slide');
    const dotsWrap = carousel.querySelector('[data-dots]');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');
    let current = 0;
 
    if (!slides.length) return;
 
    // se só tem 1 imagem, esconde as setas e os pontinhos
    if (slides.length === 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      slides[0].classList.add('active');
      return;
    }
 
    // cria os pontinhos dinamicamente
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = dotsWrap.querySelectorAll('span');
 
    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
 
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
 
    slides[0].classList.add('active');
 
    // autoplay suave (troca a cada 5s)
    setInterval(() => goTo(current + 1), 5000);
  });
 
 
  // ===== CARRINHO (contador simples) =====
  let cartCount = 0;
  const cartCountEl = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
 
  function addToCart(itemName) {
    cartCount++;
    if (cartCountEl) cartCountEl.textContent = cartCount;
 
    if (cartBtn) {
      cartBtn.classList.add('cart-pulse');
      setTimeout(() => cartBtn.classList.remove('cart-pulse'), 300);
    }
  }
 
  document.querySelectorAll('[data-add-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.getAttribute('data-item') || 'Item';
      addToCart(item);
    });
  });
 
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
 
});
 