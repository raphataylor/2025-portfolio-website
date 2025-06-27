//
// === YOUR CONTENT DATABASE ===
//
// To add, remove, or edit a portfolio item, just edit this list.
// - `type`: 'image' or 'video'
// - `source`: the path to your file in the /assets/ folder
// - `text` (optional): any annotation you want
//
const portfolioSections = [
    {
        title: "Modern Tuition",
        items: [
            { type: 'video', source: 'assets/videos/wedding.mp4', text: 'hello' },
            { type: 'image', source: 'assets/images/Layer 10400ppi.png', text: 'hello'}
        ]
    },
    {
        title: "Nfts",
        items: [
        ]
    },
    {
        title: "Webgraph",
        items: [
        ]
    },
    {
        title: "Art",
        items: [
            { type: 'image', source: 'assets/images/key-cupboard.jpg', text: 'Optional text for item 1.' }
        ] // You can fill this in
    },
    {
        title: "Rendezvous",
        items: [] // You can fill this in
    },
    {
        title: "Info vis",
        items: [] // You can fill this in
    }
];

//
// === LIGHTBOX AND GALLERY LOGIC ===
//

// --- State variables to track the current gallery ---
let currentGalleryItems = [];
let currentIndex = 0;


// --- Helper function to display the current item in the lightbox ---
function displayCurrentItem() {
    const lightboxContent = document.getElementById('lightbox-content');
    if (!lightboxContent) return;

    // Clear previous content
    lightboxContent.innerHTML = '';
    
    // Get the specific item from our stored gallery and index
    const item = currentGalleryItems[currentIndex];

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.source;
        lightboxContent.appendChild(img);
    } else if (item.type === 'video') {
        const vid = document.createElement('video');
        vid.src = item.source;
        vid.controls = true;
        vid.autoplay = true;
        vid.muted = false;
        lightboxContent.appendChild(vid);
    }
}

// --- Navigation functions ---
function showNextItem() {
    // Move to the next index, wrapping around to the start if at the end
    currentIndex = (currentIndex + 1) % currentGalleryItems.length;
    displayCurrentItem();
}

function showPreviousItem() {
    // Move to the previous index, wrapping around to the end if at the start
    currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    displayCurrentItem();
}


// --- Main functions to open and close the lightbox ---
function openLightbox(items, index) {
    const lightbox = document.getElementById('lightbox');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');

    // Store the gallery and starting index
    currentGalleryItems = items;
    currentIndex = index;

    // Display the clicked item
    displayCurrentItem();
    
    // Show/hide arrows based on gallery length
    if (currentGalleryItems.length > 1) {
        prevArrow.classList.remove('hidden');
        nextArrow.classList.remove('hidden');
    } else {
        prevArrow.classList.add('hidden');
        nextArrow.classList.add('hidden');
    }

    // Show the lightbox
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    lightbox.classList.remove('active');
    // Clear content to stop any playing videos
    lightboxContent.innerHTML = ''; 
}


// --- Dynamic Gallery Builder ---
function buildGalleries() {
    const portfolioBody = document.getElementById('portfolio-body');
    if (!portfolioBody) return;

    portfolioSections.forEach(section => {
        // ... (code to create section and title elements is the same)
        const sectionEl = document.createElement('section');
        sectionEl.className = 'gallery-section';
        const titleEl = document.createElement('h2');
        titleEl.className = 'gallery-title';
        titleEl.textContent = section.title;
        sectionEl.appendChild(titleEl);
        const gridEl = document.createElement('div');
        gridEl.className = 'gallery-grid';

        // Get the specific items for this section
        const sectionItems = section.items;

        sectionItems.forEach((item, index) => { // Now we need the index
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item';

            // *** UPDATED EVENT LISTENER ***
            // Pass the whole gallery and the specific index to the lightbox
            itemContainer.addEventListener('click', () => {
                openLightbox(sectionItems, index);
            });
            
            // ... (code to create image/video thumbnails is the same)
            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.source;
                img.alt = item.text || section.title;
                itemContainer.appendChild(img);
            } else if (item.type === 'video') {
                const vid = document.createElement('video');
                vid.src = item.source;
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                itemContainer.appendChild(vid);
            }
            gridEl.appendChild(itemContainer);
        });

        sectionEl.appendChild(gridEl);
        portfolioBody.appendChild(sectionEl);
    });
}


// --- Event Listeners to run everything ---
document.addEventListener('DOMContentLoaded', () => {
    // Build the galleries on page load
    buildGalleries();

    // Get navigation elements
    const lightbox = document.getElementById('lightbox');
    const closeButton = document.getElementById('lightbox-close');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');

    // Attach event listeners
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPreviousItem);
    nextButton.addEventListener('click', showNextItem);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Close only if clicking the background
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return; // Do nothing if lightbox is not open

        if (e.key === 'Escape') {
            closeLightbox();
        }
        if (e.key === 'ArrowRight') {
            showNextItem();
        }
        if (e.key === 'ArrowLeft') {
            showPreviousItem();
        }
    });
});