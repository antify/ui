# Antify UI

The antify ui is a vue component library for applications based on tailwindcss.

# Development

Requires Node `^22.14.0` (see `.nvmrc`) and pnpm `>=10.10.0`.

```
pnpm install
pnpm dev          # Storybook on http://localhost:6006
pnpm build        # build the package into dist/
```

Merging to `main` publishes a new npm release automatically. See [AGENTS.md](AGENTS.md) for commands, project structure, conventions and the release process.

## Component Hierarchy
Certain components, such as modals and toasts, need to be displayed on top of other elements to remain visible at all times. As a result, they require a higher z-index. The following hierarchy defines the rendering order for components with this property.

| Component   | z-index |
|-------------|---------|
| AntModal    | 50      |
| AntDropdown | 80      |
| AntPopover  | 90      |
| AntToaster  | 100     |




## Useful links:

- Chromatic docu: https://www.chromatic.com/docs/
- Storybook docu: https://storybook.js.org/docs/vue/get-started/introduction
