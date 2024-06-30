import { computed } from 'vue';
import { useData } from 'vitepress';

import type { PageData, Header } from 'vitepress';

type EnhanceArrayElement<T, P> = T extends Array<infer U> ? (U & P)[] : never;

type Headers = EnhanceArrayElement<
  PageData['headers'],
  {
    children?: Headers;
  }
>;

export const useToc = () => {
  const { page } = useData();

  return computed(() => resolveHeaders(page.value.headers));
};

export const resolveHeaders = (_headers: PageData['headers']) => {
  if (!_headers) return;

  let headers = Array<Header>();
  _headers.forEach((h: Header) => {
    if (h.level === 2) {
      headers.push(h);
      h.children.forEach((h: Header) => {
        if (h.level === 3) headers.push(h);
      });
    } else if (h.level === 3) headers.push(h);
  });
  return headers.map((header: Header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: undefined,
  }));
};
