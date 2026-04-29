// Mock Data
const tracks = [
    {
        id: 1,
        name: "Neon Dreams",
        artist: "Stellar",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        src: "#"
    },
    {
        id: 2,
        name: "Lofi Nights",
        artist: "Chill Master",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
        src: "#"
    },
    {
        id: 3,
        name: "Electric Sky",
        artist: "Nova",
        cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300&h=300&fit=crop",
        src: "#"
    },
    {
        id: 4,
        name: "Midnight City",
        artist: "Urban Pulse",
        cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
        src: "#"
    },
    {
        id: 5,
        name: "Ocean Breeze",
        artist: "Aqua",
        cover: "https://images.unsplash.com/photo-1514525253344-485683df17d4?w=300&h=300&fit=crop",
        src: "#"
    }
];

// State
let state = {
    isPlaying: false,
    currentTrackIndex: 0,
    volume: 0.7,
    progress: 30
};

// Selectors
const trackGrid = document.getElementById('track-grid');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('i');
const currentTrackName = document.getElementById('current-track-name');
const currentArtistName = document.getElementById('current-artist-name');
const currentTrackImg = document.getElementById('current-track-img');
const progressFill = document.getElementById('progress-fill');

// Initialize
function init() {
    renderTracks();
    updatePlayerUI();
}

// Render Tracks
function renderTracks() {
    trackGrid.innerHTML = tracks.map((track, index) => `
        <div class="track-card glass" onclick="playTrack(${index})">
            <img src="${track.cover}" alt="${track.name}">
            <h4>${track.name}</h4>
            <p>${track.artist}</p>
        </div>
    `).join('');
}

// Player Logic
function playTrack(index) {
    state.currentTrackIndex = index;
    state.isPlaying = true;
    updatePlayerUI();
}

function togglePlay() {
    state.isPlaying = !state.isPlaying;
    updatePlayerUI();
}

function updatePlayerUI() {
    const track = tracks[state.currentTrackIndex];
    currentTrackName.textContent = track.name;
    currentArtistName.textContent = track.artist;
    currentTrackImg.style.backgroundImage = `url(${track.cover})`;
    currentTrackImg.style.backgroundSize = 'cover';

    if (state.isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }

    progressFill.style.width = `${state.progress}%`;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);

// Run Init
init();
