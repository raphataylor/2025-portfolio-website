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
            { type: 'video', source: 'assets/videos/wedding.mp4' },
            { type: 'image', source: 'assets/images/Layer 10400ppi.png'}
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

// Get references to the lightbox elements from the DOM
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');

// --- Function to open the lightbox ---
function openLightbox(item) {
    // Clear any previous content
    lightboxContent.innerHTML = ''; 

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.source;
        lightboxContent.appendChild(img);
    } else if (item.type === 'video') {
        const vid = document.createElement('video');
        vid.src = item.source;
        vid.controls = true; // Show video controls in the lightbox
        vid.autoplay = true; // Autoplay when opened
        vid.muted = false; // Allow sound in the lightbox
        lightboxContent.appendChild(vid);
    }
    
    // Show the lightbox
    lightbox.classList.add('active');
}

// --- Function to close the lightbox ---
function closeLightbox() {
    lightbox.classList.remove('active');
    // Important: Stop any video that might be playing
    lightboxContent.innerHTML = ''; 
}

// --- Dynamic Gallery Builder ---
function buildGalleries() {
    const portfolioBody = document.getElementById('portfolio-body');
    if (!portfolioBody) return;

    portfolioSections.forEach(section => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'gallery-section';

        const titleEl = document.createElement('h2');
        titleEl.className = 'gallery-title';
        titleEl.textContent = section.title;
        sectionEl.appendChild(titleEl);
        
        const gridEl = document.createElement('div');
        gridEl.className = 'gallery-grid';

        section.items.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item';

            // *** EVENT LISTENER TO OPEN LIGHTBOX ***
            // When an item is clicked, call openLightbox with its data
            itemContainer.addEventListener('click', () => {
                openLightbox(item);
            });

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
    buildGalleries();

    // Close lightbox by clicking the 'x' button
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox by clicking the background overlay
    lightbox.addEventListener('click', (e) => {
        // Only close if the click is on the background itself, not the content
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox by pressing the 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});