import type {
  Slot, VNode,
} from 'vue';
import {
  Fragment,
} from 'vue';

/**
 * Convert html class syntax given as undefined, string ("text-base bg-primary-500") or
 * object syntax ({"text-base bg-primary-500": true}) always to object syntax ({"text-base bg-primary-500": true}).
 *
 * @param classes
 */
export function classesToObjectSyntax(classes: string | undefined | Record<string, boolean>): Record<string, boolean> {
  if (typeof classes === 'object') {
    return classes;
  }

  if (classes === undefined) {
    return {};
  }

  return {
    [classes]: true,
  };
}

/**
 * Convert the given enum to a string for documentation.
 *
 * @param value
 * @param className
 */
export function enumToPlainText(value: object, className: string) {
  let text = `enum ${className} {\n`;

  Object.keys(value).forEach((key) => {
    text += `    ${key} = '${value[key]}',\n`;
  });

  return text + '}';
}

/**
 * Detect if the given vue template slot exists and has content.
 * To get a slot in your component, call $slots['slotName'] or useSlots()['slotName'].
 */
export function hasSlotContent(slot: Slot<any> | undefined): boolean {
  if (!slot) {
    return false;
  }

  const isVnodeEmpty = (vnodes: Array<VNode>) => {
    return vnodes.every((node: VNode) => {
      if (node.type === Comment) {
        return true;
      }

      if (node.type === Text && typeof node.children === 'string' && !node.children.trim()) {
        return true;
      }

      if (
        node.type === Fragment
        && isVnodeEmpty(node.children as Array<VNode>)
      ) {
        return true;
      }

      return false;
    });
  };

  return !isVnodeEmpty(slot());
}
