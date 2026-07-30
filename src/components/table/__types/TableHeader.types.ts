// TODO:: this file exports more than table header stuff. Rename it.
export enum AntTableRowTypes {
  text = 'text',
  html = 'html',
  link = 'link',
  slot = 'slot',
}

export enum AntTableAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}

export enum AntTableSortDirection {
  asc = 'asc',
  desc = 'desc',
  neutral = 'neutral',
}

export type TableHeader = {
  identifier: string;
  title?: string;
  type: AntTableRowTypes;
  sortable?: boolean;
  sort?: (a: unknown, b: unknown, direction: AntTableSortDirection) => number;
  headerClassList?: string;
  rowClassList?: string;
  align?: AntTableAlign;
  toProp?: string;

  /**
   * Emit if the column should be shown on light table version.
   */
  lightVersion?: boolean;
  /**
   * Fixes/pins the column position during horizontal scrolling.
   * - 'left' or true: Pins column to the left side (`true` acts as a shorthand for 'left').
   * - 'right': Pins column to the right side.
   * - false or undefined: Standard scrollable column (unfixed).
   */
  fixed?: 'left' | 'right' | boolean;
};

export enum AntTableSize {
  lg = 'lg',
  md = 'md',
  sm = 'sm',
}
