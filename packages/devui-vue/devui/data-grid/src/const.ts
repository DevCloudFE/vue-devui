import type { Size } from "./data-grid-types";

export const ToggleTreeIcon = 'toggle-tree-icon';
export const DataGridCheckboxClass = 'data-grid-checkbox';
export const ColumnType = ['checkable', 'index'];
export const ColumnMinWidth = 80;
export const RowHeightMap: Record<Size, number> = {
	mini: 24,
	xs: 30,
	sm: 42,
	md: 46,
	lg: 54
}