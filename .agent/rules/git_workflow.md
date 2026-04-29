# Rule: Git Workflow and Commit Standards

## Objective
Maintain a clean, traceable history and ensure code is backed up frequently.

## Rules
- **Atomic Commits**: Commit each feature or bug fix separately. Do not combine unrelated changes in a single commit.
- **Commit Frequency**: Commit immediately after completing a functional component or resolving a sub-task. "Update continuously" is the mantra.
- **Commit Messages**: Use clear, descriptive messages following the conventional commits pattern:
    - `feat: ...` for new features.
    - `fix: ...` for bug fixes.
    - `docs: ...` for documentation changes.
    - `style: ...` for UI/CSS changes.
    - `refactor: ...` for code improvements.

## Procedure
1. Stage changes: `git add .`
2. Commit: `git commit -m "<type>: <description>"`
3. Verify: Check `git log` to ensure the history looks clean.
