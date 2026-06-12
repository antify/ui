---
component: AntAvatar
status: pending
domain: root
tags: [data-display, atomic]
---

# Blueprint: AntAvatar

## Execution Command
/create name="AntAvatar" directory="src/components/"

## Business Requirements

### 1. Presentation Logic
- **Image Mode**: If `src` (string) is provided, render an `<img>` tag.
- **Initials Fallback**: If `src` is omitted or fails to load, display uppercase initials computed from `firstName` and `lastName`.
  - Example: `firstName: "Linus"`, `lastName: "Torvalds"` -> "LT"
  - If only one prop is present, display a single letter.
- **Skeleton Mode**: If `skeleton: true`, hide content and render a pulsing circle (`bg-gray-200 animate-pulse`).

### 2. Enum & Token Mapping
- **Theme Color**: Map `state` prop (`State` enum) to background colors in initials mode.
- **Dimensions**: Map `size` prop (`Size` enum) to width/height and font sizes.
  - *Guardrail*: Ensure `Size['2xs']` is safely mapped using bracket notation.

### 3. Properties (Inline Types)
- `src?: string` (default: `''`)
- `firstName?: string` (default: `''`)
- `lastName?: string` (default: `''`)
- `state?: State` (default: `State.base`)
- `size?: Size` (default: `Size.md`)
- `skeleton?: boolean` (default: `false`)
- `disabled?: boolean` (default: `false`)
- `dataE2e?: string` (default: `'ant-avatar'`)
