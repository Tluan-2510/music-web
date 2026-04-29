# Rule: Asset Management

## Objective
Standardize how media assets (audio, images, icons) are organized and utilized.

## Folder Structure
- `/assets/audio/`: `.mp3` or `.wav` files.
- `/assets/images/`: `.webp` or `.png` for album art, avatars.
- `/assets/icons/`: SVG files for UI elements (Play, Pause, etc.).

## Guidelines
- **Images**: Prefer `.webp` for performance. Use `generate_image` for placeholder album art during development.
- **Audio**: Ensure audio files are optimized for web streaming.
- **Naming**: `track-name_artist-name.mp3`, `album-name_art.webp`.

## Integration
- Assets should be referenced using absolute or project-relative paths.
- Lazy load images where possible to improve initial load time.
