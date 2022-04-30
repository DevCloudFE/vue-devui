import { h } from 'vue';
import { useRoute, useData } from 'vitepress';
import { joinUrl, isActive } from '../utils';

// 阶梯访问表
const stairStepAccessTable = function (source, sourceRangeArray, targetArray) {
  const maxTarget = targetArray.length - 1;
  let targetIndex = 0;
  let target = targetArray[maxTarget];
  while (target === targetArray[maxTarget] && targetIndex < maxTarget) {
    if (source <= sourceRangeArray[targetIndex]) {
      // <= 意味着包含右边界
      target = targetArray[targetIndex];
    }
    targetIndex += 1;
  }
  return target;
};

const statusRange = [49, 99];
const colors = ['var(--devui-danger, #f66f6a)', 'var(--devui-warning, #fac20a)', 'var(--devui-success, #50d4ab)'];

const WHITE_LIST_READY_COMPONENTS = ['select', 'tooltip', 'table', 'tabs', 'form', 'dropdown', 'drawer', 'date-picker', 'input-number', 'tree'];

export const SideBarLink = (props) => {
  const route = useRoute();
  const { site, frontmatter } = useData();
  const depth = props.depth || 1;
  const maxDepth = frontmatter.value.sidebarDepth || Infinity;
  const headers = route.data.headers;
  const text = props.item.text;
  let status = props.item.status;
  let dotColor = '';

  if (status !== undefined) {
    status = parseInt(props.item.status, 10);
    dotColor = stairStepAccessTable(status, statusRange, colors);
  }

  const link = resolveLink(site.value.base, props.item.link);
  const children = props.item.children;
  const active = isActive(route, props.item.link);
  const childItems = depth < maxDepth ? createChildren(active, children, headers, depth + 1) : null;
  return h('li', { class: 'sidebar-link' }, [
    h(
      link ? 'a' : 'p',
      {
        class: { 'sidebar-link-item': true, active },
        href: link,
      },
      [
        status &&
          import.meta.env.DEV &&
          h('span', {
            class: 'sidebar-link-status',
            style: `background-color: ${dotColor}`,
          }),
        h(
          'span',
          {
            class: 'sidebar-link-text',
          },
          [
            text,
            import.meta.env.DEV && childItems && h('span', {
              class: 'sidebar-link-text-count',
            }, childItems?.children.length)
          ]
        ),
      ]
    ),
    childItems,
  ]);
};
function resolveLink(base, path) {
  if (path === undefined) {
    return path;
  }
  // keep relative hash to the same page
  if (path.startsWith('#')) {
    return path;
  }
  return joinUrl(base, path);
}
function createChildren(active, children, headers, depth = 1) {
  if (children && children.length > 0) {
    return h(
      'ul',
      { class: 'sidebar-links' },
      children.map((c) => {
        const pathArr = c.link.split('/');
        const componentName = pathArr[pathArr.length - 2];
        const showSidebarItem =
          import.meta.env.DEV || (import.meta.env.PROD && (c.status === '100%' || WHITE_LIST_READY_COMPONENTS.includes(componentName)));
        return showSidebarItem && h(SideBarLink, { item: c, depth });
      })
    );
  }
  return active && headers ? createChildren(false, resolveHeaders(headers), undefined, depth) : null;
}
function resolveHeaders(headers) {
  return mapHeaders(groupHeaders(headers));
}
function groupHeaders(headers) {
  headers = headers.map((h) => Object.assign({}, h));
  let lastH2;
  headers.forEach((h) => {
    if (h.level === 2) {
      lastH2 = h;
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h);
    }
  });
  return headers.filter((h) => h.level === 2);
}
function mapHeaders(headers) {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: header.children ? mapHeaders(header.children) : undefined,
  }));
}
