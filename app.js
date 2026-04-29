// Mock Data with Sample Audio
const tracks = [
    {
        id: 1,
        name: "Neon Dreams",
        artist: "Stellar",
        cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        name: "Lofi Nights",
        artist: "Chill Master",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        name: "Electric Sky",
        artist: "Nova",
        cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300&h=300&fit=crop",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

// State
let state = {
    isPlaying: false,
    currentTrackIndex: 0,
    volume: 0.7,
    progress: 0
};

// Audio Object
const audio = new Audio();
audio.volume = state.volume;

// Selectors
const trackGrid = document.getElementById('track-grid');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const playIcon = playBtn.querySelector('i');
const currentTrackName = document.getElementById('current-track-name');
const currentArtistName = document.getElementById('current-artist-name');
const currentTrackImg = document.getElementById('current-track-img');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeBar = document.querySelector('.volume-bar');
const volumeFill = document.querySelector('.volume-fill');

// Initialize
function init() {
    renderTracks();
    loadTrack(state.currentTrackIndex);
    
    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    progressBar.addEventListener('click', seek);
    volumeBar.addEventListener('click', setVolume);
    
    // Audio Events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audio.duration);
    });
    audio.addEventListener('ended', nextTrack);
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
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    currentTrackName.textContent = track.name;
    currentArtistName.textContent = track.artist;
    currentTrackImg.style.backgroundImage = `url(${track.cover})`;
    currentTrackImg.style.backgroundSize = 'cover';
}

function playTrack(index) {
    state.currentTrackIndex = index;
    loadTrack(index);
    play();
}

function play() {
    state.isPlaying = true;
    audio.play();
    updatePlayBtn();
}

function pause() {
    state.isPlaying = false;
    audio.pause();
    updatePlayBtn();
}

function togglePlay() {
    if (state.isPlaying) pause();
    else play();
}

function updatePlayBtn() {
    if (state.isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}

function prevTrack() {
    state.currentTrackIndex--;
    if (state.currentTrackIndex < 0) state.currentTrackIndex = tracks.length - 1;
    playTrack(state.currentTrackIndex);
}

function nextTrack() {
    state.currentTrackIndex++;
    if (state.currentTrackIndex >= tracks.length) state.currentTrackIndex = 0;
    playTrack(state.currentTrackIndex);
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

function seek(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const vol = clickX / width;
    audio.volume = vol;
    state.volume = vol;
    volumeFill.style.width = `${vol * 100}%`;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Run Init
init();

