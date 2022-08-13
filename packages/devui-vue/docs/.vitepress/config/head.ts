import { HeadConfig } from 'vitepress';

const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/assets/logo.svg' }],
  [
    'link',
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@devui-design/icons/icomoon/devui-icon.css',
    },
  ],
];

export default head;
