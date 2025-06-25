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
            { type: 'image', source: 'assets/images/modern-tuition-1.jpg', text: 'Optional text for item 1.' },
            { type: 'video', source: 'assets/videos/wedding.mp4' },
            { type: 'image', source: 'assets/images/modern-tuition-3.jpg' },
        ]
    },
    {
        title: "Nfts",
        items: [
            { type: 'video', source: 'assets/videos/nft-1.mp4' },
            { type: 'video', source: 'assets/videos/nft-2.mp4' },
        ]
    },
    {
        title: "Webgraph",
        items: [
            { type: 'image', source: 'assets/images/webgraph-1.jpg' }
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
// === DYNAMIC GALLERY BUILDER ===
//
// This code reads your database and builds the HTML.
// You shouldn't need to edit this part.
//
function buildGalleries() {
    const portfolioBody = document.getElementById('portfolio-body');
    if (!portfolioBody) return;

    portfolioSections.forEach(section => {
        // Create the main section container
        const sectionEl = document.createElement('section');
        sectionEl.className = 'gallery-section';

        // Create the title
        const titleEl = document.createElement('h2');
        titleEl.className = 'gallery-title';
        titleEl.textContent = section.title;
        sectionEl.appendChild(titleEl);
        
        // Create the grid for items
        const gridEl = document.createElement('div');
        gridEl.className = 'gallery-grid';

        section.items.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.className = 'gallery-item';

            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.source;
                img.alt = item.text || section.title; // Use text for alt, or fallback to section title
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

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', buildGalleries);