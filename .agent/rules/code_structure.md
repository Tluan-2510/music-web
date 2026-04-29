# Rule: Code Structure and State Management

## Objective
Ensure the codebase is modular, readable, and easy to maintain while handling complex music player logic.

## Javascript Standards
- **Modularization**: Split logic into `controller`, `ui`, and `state` modules.
- **Naming**: Use camelCase for variables/functions, PascalCase for classes/components.
- **Async/Await**: Use modern async patterns for loading audio and API calls.

## State Management
- **Single Source of Truth**: Keep track of `isPlaying`, `currentTrack`, `playlist`, and `volume` in a central `state` object.
- **Events**: Use a custom event bus or simple callback system to trigger UI updates when state changes.

## HTML/CSS
- **Semantic HTML**: Use `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`.
- **BEM Convention**: Use Block-Element-Modifier for CSS classes (e.g., `player__btn--active`).
- **Responsive**: Mobile-first design is mandatory.

## Error Handling
- Always provide visual feedback for loading errors (e.g., track failed to load).
- Graceful degradation for browsers that don't support specific web audio APIs.
