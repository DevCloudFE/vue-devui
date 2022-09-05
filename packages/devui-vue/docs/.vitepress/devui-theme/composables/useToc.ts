import { computed } from 'vue'
import { useData } from 'vitepress'
import { joinUrl } from '../utils'

import type { PageData } from 'vitepress'

type EnhanceArrayElement<T, P> = T extends Array<infer U> ? (U & P)[] : never

type Headers = EnhanceArrayElement<
  PageData['headers'],
  {
    children?: Headers
  }
>

export const useToc = () => {
  const { page } = useData()

  return computed(() => resolveHeaders(page.value.headers))
}

export const resolveLink = (base: string, path: string) => {
  if (path === undefined) {
    return path
  }
  // keep relative hash to the same page
  if (path.startsWith('#')) {
    return path
  }
  return joinUrl(base, path)
}

export const resolveHeaders = (headers: PageData['headers']) => {
  if (!headers) return;

  return mapHeaders(groupHeaders(headers))
}

export function groupHeaders(headers: PageData['headers']) {
  headers = headers.map((h) => Object.assign({}, h))
  let lastH2

  headers.forEach((h) => {
    if (h.level === 3) {
      lastH2 = h
    } else if (lastH2) {
      ;(lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter((h) => h.level === 3)
}

export function mapHeaders(headers: Headers) {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: header.children ? mapHeaders(header.children) : undefined,
  }))
}
