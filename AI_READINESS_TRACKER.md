# AI Readiness Tracker

> **Monorepo-wide roadmap** for systematically refactoring every component in the **Antify UI Kit** (`@antify/ui` v4.3.18) to meet optimal AI readability and maintainability standards: strict TypeScript typing, comprehensive JSDoc, logical code structure, enum-driven props, and proper Storybook coverage.

---

## Status Legend

| Icon | Meaning |
|------|---------|
| ⭕ | **Todo** — Component has not been audited or refactored yet |
| 🟡 | **In Progress** — Component is currently being refactored |
| ✅ | **Done** — Component has passed the full AI-readiness checklist |

---

## Architectural Tiers

Components are ordered from **lowest dependency** (fewest internal imports) to **highest dependency** (heavily composite). Refactoring should follow this bottom-up order so that each tier can leverage already-optimized foundations.

- **Tier 1 — Foundations & Atoms**: Standalone or near-standalone building blocks with minimal internal component dependencies. Refactor first.
- **Tier 2 — Form Elements & Base Inputs**: Low-level form infrastructure (labels, descriptions, base input wrapper, field orchestrator). Refactor second.
- **Tier 3 — Standard UI Components & Inputs**: The bulk of the reusable library — buttons, cards, alerts, tabs, pagination, and all concrete input types. Refactor third.
- **Tier 4 — Complex & Composite Systems**: Multi-component systems (Table, Calendar, Navbar, Tabs, Layouts) that depend on many lower-tier components. Refactor last.

---

## Tier 1 — Foundations & Atoms

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntSkeleton | `src/components/AntSkeleton.vue` | `Grouped` enum, `useFlickerProtection` composable | 🏛️ **Most-used foundational component**; verify `useFlickerProtection` integration; ensure `visible` prop logic is robust |
| ⭕ | AntSpinner | `src/components/AntSpinner.vue` | `State` enum, `AntSpinnerSize` type | SVG-based; size/state variants via `Record<...>` maps; needs enum validation in `onMounted` |
| ⭕ | AntIcon | `src/components/AntIcon.vue` | `AntSkeleton`, `IconSize` type, `IconDefinition` (FontAwesome) | Already well-documented with JSDoc; verify skeleton integration; FontAwesome dependency |
| ⭕ | AntTooltip | `src/components/AntTooltip.vue` | `InputState` enum, `@floating-ui/vue`, `@vueuse/core` | Complex floating-ui integration with arrow SVG; hover/delay logic; teleported content |
| ⭕ | AntDropdown | `src/components/AntDropdown.vue` | `@floating-ui/vue`, `@vueuse/core` (`onKeyStroke`, `onClickOutside`) | Floating menu with `teleport`; keyboard escape handling; `classesToObjectSyntax` utility |
| ⭕ | AntPopover | `src/components/AntPopover.vue` | `Position` enum, `@floating-ui/vue`, `@vueuse/components` | Arrow-float implementation; `v-on-click-outside` directive; complex SVG arrow rendering |
| ⭕ | AntTransitionCollapseHeight | `src/components/transitions/AntTransitionCollapseHeight.vue` | _None_ | **⚠️ Uses `@ts-nocheck` and `any` types** — JavaScript-based height animation; needs full TS rewrite |
| ⭕ | AntContent | `src/components/AntContent.vue` | _None_ | Minimal wrapper; just `padding` prop; simple but lacks full type-based emits |
| ⭕ | AntFormGroup | `src/components/forms/AntFormGroup.vue` | `Direction` enum | Simple layout wrapper; uses regex on `attrs.class` for gap detection — fragile pattern |
| ⭕ | AntFormGroupLabel | `src/components/forms/AntFormGroupLabel.vue` | `AntSkeleton` | Simple label wrapper; lacks type-based emits |
| ⭕ | AntProgress | `src/components/AntProgress.vue` | `State` enum | Simple bar; uses `script setup lang="ts"` without `defineProps<{...}>()` — uses inferred types |

---

## Tier 2 — Form Elements & Base Inputs

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntInputLabel | `src/components/inputs/Elements/AntInputLabel.vue` | `AntSkeleton`, `Size` enum | Label with skeleton support; uses `emit('clickContent')` — no type-based emits |
| ⭕ | AntInputDescription | `src/components/inputs/Elements/AntInputDescription.vue` | `AntSkeleton`, `Size` enum, `InputState` enum | Description text with state coloring; well-structured |
| ⭕ | AntInputLimiter | `src/components/inputs/Elements/AntInputLimiter.vue` | `AntSkeleton`, `Size` enum, `InputState` enum | Shows `value/maxValue` counter; clean and focused |
| ⭕ | AntBaseInput | `src/components/inputs/Elements/AntBaseInput.vue` | `AntSkeleton`, `AntIcon`, `Grouped` enum, `InputState` enum, `Size` enum, `BaseInputType` | **Critical core input element** — handles all native `<input>` rendering, icon slots, state styling, keyboard events; well-documented; watch for complex icon-right padding logic |
| ⭕ | AntSelectMenu | `src/components/inputs/Elements/AntSelectMenu.vue` | `InputState` enum, `Size` enum, `SelectOption`, `@floating-ui/vue`, `@vueuse/core` | Floating dropdown menu used by `AntSelect`, `AntTagInput`, `AntCountryInput`; keyboard navigation; `isGroupLabel` support |
| ⭕ | AntField | `src/components/forms/AntField.vue` | `AntInputLabel`, `AntInputDescription`, `AntInputLimiter`, `Size` enum, `InputState` enum | **Orchestrator for form fields** — composes label + description + limiter + messages; emits `clickLabel` and `validate`; well-structured |
| ⭕ | AntFlag | `src/components/AntFlag.vue` | `AntSkeleton`, `FlagSize` type | Flag icon via `flagpack` CSS library; uses `isoCode` prop for country flags; scoped style overrides |

---

## Tier 3 — Standard UI Components & Inputs

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntBadge | `src/components/AntBadge.vue` | `CornerPosition`, `Size`, `State` enums | Wrapper-mode (slot-based) vs standalone; dot/content sizing; well-documented with JSDoc |
| ⭕ | AntAvatar | `src/components/AntAvatar.vue` | `Size`, `State` enums | Image + fallback initials; `imageError` ref handling; `Size['2xs']` bracket notation already used correctly |
| ⭕ | AntKeycap | `src/components/AntKeycap.vue` | `AntIcon`, `AntSkeleton`, `IconSize` type, `AntKeycapSize` type | **Has fixme comment** (`TODO:: Fix typo KeyCap`); no `onMounted` enum validation; missing JSDoc |
| ⭕ | AntButton | `src/components/AntButton.vue` | `AntIcon`, `AntSkeleton`, `AntSpinner`, `AntTooltip`, `ButtonSize`, `ButtonType`, `IconSize`, `Grouped`, `InputState`, `Position`, `State` | **Most complex atomic component** — renders as `<button>`, `<router-link>`, or `<div>`; tooltip integration; grouped buttons; spinner/icon states; well-documented with JSDoc |
| ⭕ | AntTag | `src/components/AntTag.vue` | `AntIcon`, `AntTagSize`, `TagState`, `IconSize` type | Dismissible tags with left icon; uses `TagState` (own enum, not global `State`); no JSDoc on emits |
| ⭕ | AntCard | `src/components/AntCard.vue` | `AntSkeleton`, `Size` enum | Clickable skeleton wrapper; `Size['2xs']` bracket notation used correctly; well-documented |
| ⭕ | AntListGroup | `src/components/AntListGroup.vue` | `AntSkeleton` | Group container with gap-px list; `hasInputState` pattern for disabled/readonly/skeleton |
| ⭕ | AntListGroupItem | `src/components/AntListGroupItem.vue` | `AntIcon`, `ListGroupItemState` type | Renders as `<router-link>` or `<div>`; icon-left/icon-right slots; well-documented |
| ⭕ | AntAlert | `src/components/AntAlert.vue` | `AntIcon`, `AntTooltip`, `AntSkeleton`, `InputState` enum, `IconSize` type | Alert with dismiss, icon, tooltip, skeleton; well-documented; uses `InputState` for coloring |
| ⭕ | AntModal | `src/components/AntModal.vue` | `AntButton`, `AntSkeleton` | Fullscreen and non-fullscreen modes; fade/bounce transitions; `@ts-nocheck` not present; `defineExpose` |
| ⭕ | AntPagination | `src/components/AntPagination.vue` | `AntButton`, `AntSkeleton`, `State`, `Grouped` enums | Light/default pagination modes; uses `AntButton` in grouped layout; inline pagination logic |
| ⭕ | AntToast | `src/components/AntToast.vue` | `AntIcon`, `AntButton`, `InputState`, `State` enums, `IconSize` type | Toast notification with title, icon, undo button; uses `InputState`; `state as unknown as State` cast |
| ⭕ | AntToaster | `src/components/AntToaster.vue` | `AntToast`, `CornerPosition` enum, `Toast` type | Toast container with TransitionGroup; position-based animation direction |
| ⭕ | AntAccordion | `src/components/AntAccordion.vue` | `AntAccordionItem`, `AntSkeleton`, `CollapseStrategy`, `AccordionItem` type | `single` / `multiple` collapse strategy; slot-based item content; model-bound `openItems` |
| ⭕ | AntAccordionItem | `src/components/AntAccordionItem.vue` | `AntIcon`, `AntTransitionCollapseHeight`, `IconSize`, `AntSkeleton` | Imperative open/close emit; has `TODO:: Stehengeblieben: delays machen`; scoped bounce/slide animations |
| ⭕ | AntTextInput | `src/components/inputs/AntTextInput.vue` | `AntField`, `AntBaseInput`, `AntButton`, `AntIcon`, `Size`, `TextInputType`, `InputState`, `Grouped`, `State`, `BaseInputType` | Standard text input with nullable clear button; uses `useVModel` |
| ⭕ | AntSearch | `src/components/inputs/AntSearch.vue` | `AntField`, `AntBaseInput`, `Size`, `BaseInputType` | Debounced search input with search icon; `inputTimeout` prop; `TODO:: implement query prop` |
| ⭕ | AntSelect | `src/components/inputs/AntSelect.vue` | `AntField`, `AntIcon`, `AntSkeleton`, `AntButton`, `AntSelectMenu`, `Size`, `Grouped`, `State`, `InputState`, `IconSize`, `SelectOption` | Custom dropdown select (non-native); nullable clear button; keyboard navigation via `AntSelectMenu`; `v-on-click-outside` |
| ⭕ | AntCheckbox | `src/components/inputs/AntCheckbox.vue` | `AntField` (from Elements), `AntSkeleton`, `AntIcon`, `InputState`, `Size`, `IconSize` | Custom checkbox with delayed animation styling; `focusColorClass`/`inactiveColorClass`/`activeColorClass` customization |
| ⭕ | AntCheckboxGroup | `src/components/inputs/AntCheckboxGroup.vue` | `AntCheckbox`, `AntField`, `AntSkeleton`, `Direction`, `InputState`, `LayoutVariant`, `Size`, `AntCheckboxType` | Default/block/tab layout variants; aggregator for `AntCheckbox` instances |
| ⭕ | AntRadio | `src/components/inputs/AntRadio.vue` | `AntField` (from Elements), `AntSkeleton`, `InputState`, `Size`, `AntRadioTypes` | Custom radio with fade transition on active state |
| ⭕ | AntRadioGroup | `src/components/inputs/AntRadioGroup.vue` | `AntRadio`, `AntField`, `AntSkeleton`, `InputState`, `LayoutVariant`, `Size`, `Direction`, `AntRadioTypes` | Default/block/tab layout variants; container for `AntRadio` items |
| ⭕ | AntSwitch | `src/components/inputs/AntSwitch.vue` | `AntField`, `AntSkeleton`, `InputState`, `Size` | Toggle switch with sliding ball; custom sizing; uses `hasSlotContent` utility |
| ⭕ | AntSwitcher | `src/components/inputs/AntSwitcher.vue` | `AntField`, `AntButton`, `AntSkeleton`, `State`, `Grouped`, `InputState`, `Size`, `SwitcherOption` | Left/right arrow navigation through options; uses `AntButton` in grouped layout |
| ⭕ | AntTextarea | `src/components/inputs/AntTextarea.vue` | `AntField`, `AntSkeleton`, `AntIcon`, `Grouped`, `InputState`, `Size`, `IconSize` | Textarea with limiter, state icon, resize toggle; `TODO #59` about scrollbar icon offset |
| ⭕ | AntDateInput | `src/components/inputs/AntDateInput.vue` | `AntField`, `AntBaseInput`, `AntButton`, `AntIcon`, `Size`, `Grouped`, `InputState`, `State`, `BaseInputType`, `AntDateInputTypes`, `IconSize` | Native date/time picker input with calendar icon; nullable clear button |
| ⭕ | AntNumberInput | `src/components/inputs/AntNumberInput.vue` | `AntField`, `AntBaseInput`, `AntButton`, `Size`, `InputState`, `State`, `Grouped`, `BaseInputType` | Stepped number input with optional +/- indicators; `Big.js` for decimal precision; keyboard arrow support |
| ⭕ | AntPasswordInput | `src/components/inputs/AntPasswordInput.vue` | `AntField`, `AntBaseInput`, `AntIcon`, `Size`, `InputState`, `BaseInputType`, `IconSize` | Password visibility toggle (eye icon); `BaseInputType` switch between `text` and `password` |
| ⭕ | AntUnitInput | `src/components/inputs/AntUnitInput.vue` | `AntField`, `AntBaseInput`, `AntButton`, `Size`, `InputState`, `State`, `Grouped`, `BaseInputType` | Number input with unit suffix button (string or icon); `Big.js` for decimal formatting |
| ⭕ | AntRangeSlider | `src/components/inputs/AntRangeSlider.vue` | `AntField`, `InputState`, `Size` | Native `<input type="range">` wrapper; scoped styles for thumb customization |
| ⭕ | AntImageInput | `src/components/inputs/AntImageInput.vue` | `AntField`, `AntIcon`, `AntButton`, `AntSpinner`, `AntInputDescription`, `AntSkeleton`, `Size`, `InputState`, `State`, `IconSize` | Drag-and-drop image upload with preview; body-level drag events; loading spinner overlay |
| ⭕ | AntMultiSelect | `src/components/inputs/AntMultiSelect.vue` | `AntField`, `AntIcon`, `AntSkeleton`, `AntDropdown`, `AntButton`, `AntCheckboxGroup`, `Size`, `Grouped`, `InputState`, `IconSize` | Multi-value select with checkbox dropdown; nullable clear; `valueLabel` aggregation |
| ⭕ | AntTagInput | `src/components/inputs/AntTagInput.vue` | `AntField` (from Elements), `AntTag`, `AntIcon`, `AntSelectMenu`, `AntSkeleton`, `Grouped`, `InputState`, `Size`, `AntTagSize`, `IconSize`, `AntTagInputSize`, `TagState` | Tag management with autocomplete dropdown; `allowCreate` / `allowDuplicates` / `createCallback` |
| ⭕ | AntCountryInput | `src/components/inputs/AntCountryInput.vue` | `AntField`, `AntSelectMenu`, `AntSearch`, `AntIcon`, `AntSkeleton`, `AntFlag`, `Size`, `InputState`, `Grouped`, `Locale`, `CountryValueKey`, `IconSize`, `FlagSize`, `COUNTRIES` | Country selector with flag icons; searchable dropdown; locale-aware sorting; `optionValueKey` flexible binding |
| ⭕ | AntBirthdayInput | `src/components/inputs/AntBirthdayInput.vue` | `AntField`, `AntButton`, `Size`, `Grouped`, `InputState`, `State`, `ButtonSize`, `@floating-ui/vue`, `@vueuse/core` | 3-step date selector (day → month → year) with leap-year validation; Floating UI menu |
| ⭕ | AntPhoneNumberInput | `src/components/inputs/AntPhoneNumberInput.vue` | `AntField`, `AntCountryInput`, `AntBaseInput`, `Size`, `InputState`, `Grouped`, `Locale`, `CountryValueKey`, `BaseInputType` | Country code prefix + phone number; phone mask formatting; paste support |

---

## Tier 4 — Complex & Composite Systems

### 4a — Table System

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntCollapsibleTableRowContent | `src/components/table/AntCollapsibleTableRowContent.vue` | _None_ | CSS grid-based expand/collapse; clean and minimal |
| ⭕ | AntTd | `src/components/table/AntTd.vue` | `TableHeader`, `AntTableAlign`, `AntTableRowTypes`, `AntTableSize` types, `RouterLink` | Cell renderer for text/link/html/slot types; slot-based cell content |
| ⭕ | AntTh | `src/components/table/AntTh.vue` | `TableHeader`, `AntTableSize`, `AntTableSortDirection` types, `AntTableSortButton` | Header cell with sort state cycle (neutral → asc → desc) |
| ⭕ | AntTableSortButton | `src/components/table/AntTableSortButton.vue` | `AntButton`, `AntTableSize`, `AntTableSortDirection` types, `Size` enum | Sort direction indicator button; uses `AntButton` |
| ⭕ | AntTableSkeleton | `src/components/table/AntTableSkeleton.vue` | `AntTd`, `AntTh`, `AntSkeleton`, `TableHeader`, `AntTableSize`, `AntTableRowTypes` | Skeleton placeholder mirroring table structure |
| ⭕ | AntTable | `src/components/table/AntTable.vue` | `AntTh`, `AntTd`, `AntSpinner`, `AntCollapsibleTableRowContent`, `AntButton`, `AntIcon`, `AntTableSkeleton`, `CollapseStrategy`, `Size`, `State`, `useFlickerProtection` | **Most complex component** — table with sort, select, expand/collapse, loading overlay, empty state; TODO comments about virtual list and sorting |

### 4b — Calendar / Date Picker System

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntMonthPicker | `src/components/calendar/AntMonthPicker.vue` | _None_ | Simple month grid (3×4); emits `select` |
| ⭕ | AntYearPicker | `src/components/calendar/AntYearPicker.vue` | `AntButton` | Scrollable year list (41 years); `scrollToYear` exposed method |
| ⭕ | AntDateSwitcher | `src/components/calendar/AntDateSwitcher.vue` | `AntButton`, `AntDropdown`, `AntMonthPicker`, `AntYearPicker`, `Grouped` enum | Month/year navigation with dropdowns for month and year selection |
| ⭕ | AntDatePicker | `src/components/calendar/AntDatePicker.vue` | `AntDateSwitcher`, `AntSkeleton`, `AntTooltip`, `date-fns` | **Calendar matrix** — 6×7 day grid; weekend filtering; week numbers; special days; shown as timestamp |

### 4c — Navbar System

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntNavbarItem | `src/components/navbar/AntNavbarItem.vue` | `AntIcon`, `AntTransitionCollapseHeight`, `AntTooltip`, `NavbarItemTypes` | Recursive item with children; tooltip when disabled; router-link support |
| ⭕ | AntNavbar | `src/components/navbar/AntNavbar.vue` | `AntNavbarItem`, `NavbarItemTypes` | Container that renders `AntNavbarItem` list |

### 4d — Tabs System

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntTabItem | `src/components/tabs/AntTabItem.vue` | `AntIcon`, `AntSkeleton`, `TabItemState` type, `RouteLocationRaw` | Tab item with active indicator, icon, router-link support, state-driven icons |
| ⭕ | AntTabs | `src/components/tabs/AntTabs.vue` | `AntTabItem`, `TabItem` | Tab container with `modelValue`-driven active tab |

### 4e — Layouts

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntNavLeftLayout | `src/components/layouts/AntNavLeftLayout.vue` | `AntNavbar`, `NavbarItemTypes` | Sidebar + content layout; logo image slot |

### 4f — Deprecated / Stubbed

| Status | Component | Relative Path | Internal Dependencies | Notes |
|--------|-----------|---------------|----------------------|-------|
| ⭕ | AntRichTextEditor | `src/components/inputs/AntRichTextEditor.vue` | _(all commented out)_ | **Entirely commented out** — `@tiptap/vue-3` dependency; needs full re-implementation or removal |

---

## Pre-Commit Verification Checklist

Before marking any component as ✅ **Done**, verify ALL of the following:

- [ ] Stories exist and are placed correctly (co-located or in `__stories/` per domain convention)
- [ ] Types exist (embedded in `.vue` or standalone `.types.ts` depending on component complexity)
- [ ] No raw string literals are used where global enums exist; bracket notation `Size['2xs']` is verified
- [ ] The component is registered in `src/components/index.ts` (import + export)
- [ ] New standalone type files (if any) are re-exported through the appropriate `__types/index.ts` barrel and `src/types.ts`
- [ ] `pnpm run lint:fix` has been executed with zero remaining errors
- [ ] `pnpm run typecheck` passes with zero warnings
- [ ] Private/internal components do NOT have the `Ant` prefix and are NOT exported in `src/components/index.ts`
- [ ] All props use type-based `defineProps<{ ... }>()` syntax (no runtime `props: { ... }` objects)
- [ ] All emits use type-based `defineEmits<{ ... }>()` syntax
- [ ] `onMounted` contains `handleEnumValidation` calls for all enum props
- [ ] `@ts-nocheck` and `// @ts-ignore` directives have been eliminated
- [ ] `any` types are eliminated in favor of explicit typing
- [ ] `TODO` / `FIXME` comments are resolved or documented
- [ ] JSDoc `@slot`, `@param`, `@returns`, `@values`, `@default` annotations are present on all public props and slots
