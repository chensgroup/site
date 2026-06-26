(() => {
  const images = [
    "index/DSC00004.avif",
    "index/DSC02428.avif",
    "index/DSC03441.avif",
    "index/DSC09029.avif",
    "index/DSC09432.avif",
    "index/DSC09464.avif"
  ];

  let slideIndex = 1;
  let slideTimeout;

  function initSlideshow() {
    const container = document.getElementById('slideshow-container');
    if (!container) return;

    container.innerHTML = '';

    images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = `slide${idx === 0 ? ' active' : ''}`;
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Slideshow photo ${idx + 1}`;
      
      slide.appendChild(img);
      container.appendChild(slide);
    });

    const prevBtn = document.createElement('button');
    prevBtn.className = 'slideshow-prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.onclick = () => moveSlide(-1);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'slideshow-next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.onclick = () => moveSlide(1);

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slideshow-dots';
    
    images.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `dot${idx === 0 ? ' active' : ''}`;
      dot.onclick = () => currentSlide(idx);
      dotsContainer.appendChild(dot);
    });

    container.appendChild(dotsContainer);

    slideTimeout = setTimeout(showSlides, 5000);
  }

  function showSlides() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    slideTimeout = setTimeout(showSlides, 5000);
  }

  function moveSlide(n) {
    clearTimeout(slideTimeout);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');

    slideIndex += n;
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    slideTimeout = setTimeout(showSlides, 5000);
  }

  function currentSlide(n) {
    clearTimeout(slideTimeout);
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;
    
    slides[slideIndex - 1].classList.remove('active');
    dots[slideIndex - 1].classList.remove('active');

    slideIndex = n + 1;

    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');

    slideTimeout = setTimeout(showSlides, 5000);
  }

  // Bind functions to window so click events on generated buttons work correctly
  window.moveSlide = moveSlide;
  window.currentSlide = currentSlide;

  document.addEventListener('DOMContentLoaded', initSlideshow);
})();
