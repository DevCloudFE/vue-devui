import type { ExtractPropTypes, PropType } from 'vue';
import type { NavigationFailure, RouteLocationRaw } from 'vue-router';

export const menuItemProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
    default: '',
  },
  route: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
} as const;

export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>;

export interface ChangeRouteResult {
  route: RouteLocationRaw;
  routerResult: Promise<void | NavigationFailure | undefined>;
}
