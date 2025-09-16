// --- Render dinámico de estrellas según data-rating ---
function renderRatings() {
  const cards = document.querySelectorAll('.product-card[data-rating]');
  cards.forEach(card => {
    const rating = parseFloat(card.dataset.rating) || 0;
    const reviews = card.dataset.reviews || '0';
    const starsContainer = card.querySelector('.stars');
    const reviewsSpan = card.querySelector('.reviews');
    if (!starsContainer) return;

    const full = Math.floor(rating);
    const fraction = rating - full;
    const half = fraction >= 0.25 && fraction < 0.75;
    const extraFull = fraction >= 0.75 ? 1 : 0;
    const totalFull = full + extraFull;
    const empty = 5 - totalFull - (half ? 1 : 0);

    let html = '';
    for (let i = 0; i < totalFull; i++) html += '<i class="bi bi-star-fill"></i>';
    if (half) html += '<i class="bi bi-star-half"></i>';
    for (let i = 0; i < empty; i++) html += '<i class="bi bi-star"></i>';

    starsContainer.innerHTML = html;
    if (reviewsSpan) reviewsSpan.textContent = `(${reviews})`;
    const ratingValueSpan = card.querySelector('.rating-value');
    if (ratingValueSpan) {
      ratingValueSpan.textContent = rating.toFixed(1);
    }
    starsContainer.setAttribute('aria-label', `Calificación ${rating.toFixed(1)} de 5`);
  });
}

renderRatings();

// (Opcional) acción para el botón +
document.querySelectorAll('.product-card .btn-add').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    // Aquí podrías disparar evento de "añadir al carrito"
    btn.classList.add('pulse-add');
    setTimeout(() => btn.classList.remove('pulse-add'), 500);
  });
});
