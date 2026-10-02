# AGENTS.md

`@antify/ui` is a Vue 3 component library (Tailwind CSS 4, Storybook) published to npm. Components are shipped as source-like files (built with `unbuild`/`mkdist`, no bundle).

## WARNING: merging to `main` publishes a release

Every merge to `main` publishes a new npm version of `@antify/ui` without manual approval:

1. `.github/workflows/chromatic.yml` runs on every push (install, `pnpm run build`, Chromatic upload).
2. `.github/workflows/release.yml` starts after a successful `chromatic` run on `main` and runs `pnpm release` (`standard-version && git push --follow-tags && pnpm publish --access public`).
3. `standard-version` derives the version from the Conventional Commits, updates `CHANGELOG.md`, commits `chore(release): x.y.z` and tags it.

Neither workflow runs type-check, lint or tests. Never run `pnpm release` or `pnpm publish` locally.

## Setup

- Node `^22.14.0` (`.nvmrc`), pnpm `>=10.10.0` (`packageManager: pnpm@10.10.0`).

## Commands

Durations measured on a warm cache (Node 24, pnpm 10.10.0).

| Command | Purpose | Duration |
|---|---|---|
| `pnpm install --frozen-lockfile` | install | ~2 s |
| `pnpm build` | build `dist/` with unbuild | ~6 s |
| `pnpm type-check` | `vue-tsc --build --force` (includes `*.stories.ts`) | ~7 s |
| `pnpm lint` | `eslint src` (no auto-fix) | ~4 s |
| `pnpm lint:fix` | `eslint src --fix` | ~5 s |
| `pnpm dev` | Storybook dev server on port 6006 | - |
| `pnpm build-storybook` | static Storybook into `storybook-static/` (gitignored) | ~12 s |

Fastest check after a change: `pnpm exec eslint <changed files>` (about 1 s) and `pnpm type-check`, then `pnpm build`. Visual check: `pnpm dev` and open the component's story.

## Tests

There are no tests (no test script, no `*.test`/`*.spec` files). Verify through `pnpm build`, the type-check of the touched files, lint of the touched files and Storybook.

## Known baseline (2026-10-02, main @ 2a83466)

- `pnpm type-check` fails with 60 errors (30 in `src/**/*.vue|ts`, 30 in `*.stories.ts`).
- `pnpm lint` reports 179 problems (61 errors, 118 warnings).
- Rule: introduce no new errors in files you touch. Compare the counts before and after your change.
- The CI workflow `pr.yml` runs type-check and lint as non-blocking steps for this reason; `pnpm build` is blocking.

## Structure

- `src/index.ts` exports components, composables, handler, utils, constants, types.
- `src/install.ts` is a Vue plugin that globally registers every entry of `src/components/index.ts`.
- `src/components/` holds the components: flat files (`AntButton.vue`, `AntModal.vue`, ...) plus folders `calendar`, `forms`, `inputs`, `layouts`, `navbar`, `table`, `tabs`, `transitions`.
- `src/components/inputs/` contains all inputs; `inputs/Elements/` holds building blocks (`AntBaseInput`, `AntSelectMenu`, `AntInputLabel`, ...); `inputs/__types/` holds per-component enums/types.
- Stories live next to components in `<folder>/__stories/<Name>.stories.ts`. Exceptions: `components/Main.stories.ts` and `inputs/AntColorInput/AntColorInput.stories.ts`.
- `src/enums/` holds shared enums (Size, State, InputState, ...); `src/composables`, `src/constants`, `src/utils.ts` are shared helpers.

## Adding or changing a component or prop

1. Edit the component's `.vue` file. Components use `<script lang="ts" setup>`, `defineOptions({ inheritAttrs: false })`, `withDefaults(defineProps<{...}>(), {...})` and `useVModel(props, 'modelValue', emit)` for v-model.
2. For a new prop, add its type in `defineProps` and a default in `withDefaults` if needed. For an enum prop, define the enum in the matching `__types` folder (e.g. `inputs/__types/AntTextInput.types.ts`) and validate it in `onMounted` with `handleEnumValidation(prop, Enum, 'name')`.
3. Pass it through in the template. Date, Number, Password, PhoneNumber, Search, Text and Unit inputs render through `AntBaseInput`; Country, Select and TagInput render through `AntSelectMenu`; almost all inputs (all but `AntRichTextEditor`) wrap their content in `AntField`. Mind `v-bind="$attrs"` because of `inheritAttrs: false`. If several inputs need the prop, change the shared building block (`AntBaseInput`, `AntSelectMenu` or `AntField`) instead.
4. Update or add the story in `__stories/` (argTypes and an example).
5. For a new component, add the import and the export entry in `src/components/index.ts`; otherwise it is missing from the package export and from `install.ts`.
6. Run the checks from the Commands section.

## Styling

Tailwind CSS classes inline in the template (Tailwind 4 is a peer dependency, `src/index.css`). Colors use the design tokens (`base-`, `primary-`, `danger-`, ...). Per-state class maps are keyed by `InputState`. Code style is enforced by ESLint (`@stylistic`: 2 spaces, semicolons, trailing commas in multiline, multiline imports).

## Commits

Use Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, ...). `standard-version` derives the next version from them: `fix` is a patch, `feat` a minor, a breaking change a major.
