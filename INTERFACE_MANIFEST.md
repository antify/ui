# Interface Manifest — Antify UI Kit Components

> **Date:** June 12, 2026
> **Components:** `AntAlert`, `AntIcon`, `AntListGroup`, `AntListGroupItem`

---

## 1. `AntAlert.vue`

### Props

| Prop | Тип | Enum values | Default |
|---|---|---|---|
| `dataE2e` | `string` | — | `'alert'` |
| `dismissBtn` | `boolean` | — | `true` |
| `disabled` | `boolean` | — | `false` |
| `expanded` | `boolean` | — | `false` |
| `icon` | `boolean` | — | `true` |
| `questionMarkText` | `string \| null` | — | `null` |
| `readonly` | `boolean` | — | `false` |
| `skeleton` | `boolean` | — | `false` |
| `state` | `InputState` | `'base' \| 'danger' \| 'info' \| 'success' \| 'warning'` | `InputState.base` |
| `title` | `string \| null` | — | `null` |

### Events

| Event | Payload |
|---|---|
| `close` | `[]` |

### Slots

| Slot | Description |
|---|---|
| `default` | Body content below the title row |
| `title` | Alert title (falls back to `title` prop) |
| `question-mark-text` | Tooltip trigger (falls back to `faCircleQuestion` + `questionMarkText` prop) |

---

## 2. `AntIcon.vue`

### Props

| Prop | Тип | Enum values | Default |
|---|---|---|---|
| `icon` (required) | `IconDefinition` | — | — |
| `color` | `string` | — | `'text-for-white-bg-font'` |
| `dataE2e` | `string` | — | `'icon'` |
| `disabled` | `boolean` | — | `false` |
| `readonly` | `boolean` | — | `false` |
| `skeleton` | `boolean` | — | `false` |
| `size` | `IconSize` | `'3xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' \| '2xs'` | `IconSize.sm` |

### Events

| Event | Payload |
|---|---|
| `click` | `[event: MouseEvent]` |
| `blur` | `[event: FocusEvent]` |

### Slots

| Slot | Description |
|---|---|
| `default` | Custom content inside the icon container (replaces `FaIcon`) |

---

## 3. `AntListGroup.vue`

### Props

| Prop | Тип | Enum values | Default |
|---|---|---|---|
| `dataE2e` | `string` | — | `'list-group'` |
| `disabled` | `boolean` | — | `false` |
| `expanded` | `boolean` | — | `false` |
| `readonly` | `boolean` | — | `false` |
| `shadow` | `boolean` | — | `false` |
| `skeleton` | `boolean` | — | `false` |

### Events

| Event | Payload |
|---|---|
| `click` | `[event: MouseEvent]` |
| `blur` | `[event: FocusEvent]` |

### Slots

| Slot | Description |
|---|---|
| `default` | List group items (обычно `AntListGroupItem`) |

---

## 4. `AntListGroupItem.vue`

### Props

| Prop | Тип | Enum values | Default |
|---|---|---|---|
| `dataE2e` | `string` | — | `'list-group-item'` |
| `disabled` | `boolean` | — | `false` |
| `iconLeft` | `IconDefinition` | — | `undefined` |
| `iconRight` | `IconDefinition` | — | `undefined` |
| `readonly` | `boolean` | — | `false` |
| `skeleton` | `boolean` | — | `false` |
| `state` | `ListGroupItemState` | `'base' \| 'primary' \| 'secondary' \| 'info' \| 'success' \| 'warning' \| 'danger'` | `ListGroupItemState.base` |
| `to` | `RouteLocationRaw \| string` | — | `undefined` |

### Events

| Event | Payload |
|---|---|
| `click` | `[event: MouseEvent]` |
| `blur` | `[event: FocusEvent]` |

### Slots

| Slot | Description |
|---|---|
| `default` | Основной текст/контент между иконками |
| `icon-left` | Слева от контента (fallback: `<AntIcon :icon="iconLeft">`) |
| `icon-right` | Справа от контента (fallback: `<AntIcon :icon="iconRight">`) |

---

## Enum Values (сводка)

| Enum | Компонент | Значения |
|---|---|---|
| **`InputState`** | `AntAlert` | `base`, `danger`, `info`, `success`, `warning` |
| **`IconSize`** | `AntIcon` | `3xl`, `lg`, `md`, `sm`, `xs`, `2xs` |
| **`ListGroupItemState`** | `AntListGroupItem` | `base`, `primary`, `secondary`, `info`, `success`, `warning`, `danger` |

