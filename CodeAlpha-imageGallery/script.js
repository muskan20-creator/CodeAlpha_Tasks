// Get elements
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let filteredItems = Array.from(galleryItems);

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = filteredItems.indexOf(item);
        showLightbox(currentIndex);
    });
});

// Show lightbox with image and caption
function showLightbox(index) {
    const imgSrc = filteredItems[index].querySelector('img').src;
    const caption = filteredItems[index].querySelector('.caption').textContent;
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightboxCounter.textContent = `${index + 1} / ${filteredItems.length}`;
    lightbox.style.display = 'flex';
}

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Navigate to previous image
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : filteredItems.length - 1;
    showLightbox(currentIndex);
});

// Navigate to next image
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < filteredItems.length - 1) ? currentIndex + 1 : 0;
    showLightbox(currentIndex);
});

// Close lightbox on outside click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        if (filter === 'all') {
            filteredItems = Array.from(galleryItems);
        } else {
            filteredItems = Array.from(galleryItems).filter(item => item.getAttribute('data-category') === filter);
        }

        // Hide all items
        galleryItems.forEach(item => item.style.display = 'none');
        // Show filtered items
        filteredItems.forEach(item => item.style.display = 'block');

        // Reset current index
        currentIndex = 0;
    });
});