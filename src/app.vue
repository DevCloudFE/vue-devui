<template>
  <div class="app-container">
    <div class="app-bar">
      <header>
        <h1 class="title">
          <a target="_self" href="/home">
            <span class="logo">
              <svg
                width="26px"
                height="26px"
                viewBox="0 0 26 26"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <linearGradient x1="89.5364583%" y1="21.60078%" x2="7.57349918%" y2="65.7395747%" id="linearGradient-1">
                    <stop stop-color="#2954C8" offset="0%"></stop>
                    <stop stop-color="#5170FF" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient x1="89.5364583%" y1="21.4573588%" x2="7.57349918%" y2="65.8190624%" id="linearGradient-2">
                    <stop stop-color="#2954C8" offset="0%"></stop>
                    <stop stop-color="#5170FF" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient x1="-11.5260417%" y1="24.3907324%" x2="87.1145833%" y2="74.8850926%" id="linearGradient-3">
                    <stop stop-color="#89D2FF" offset="0%"></stop>
                    <stop stop-color="#5170FF" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient x1="0%" y1="18.4813953%" x2="75.9513522%" y2="81.5186047%" id="linearGradient-4">
                    <stop stop-color="#89D2FF" offset="0%"></stop>
                    <stop stop-color="#5170FF" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g id="Devui-Logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Group-2" transform="translate(3.000000, 0.000000)">
                    <g>
                      <path
                        d="M4.28576801,9.22873192 L9.32098286,6.02205882 L13.1143389,8.49673203 L0.010890596,17.0193525 L0.010890596,17.0193525 C0.010890596,13.8625823 1.62310848,10.9244448 4.28576801,9.22873192 Z"
                        id="Path-39-Copy-3"
                        fill="url(#linearGradient-1)"
                      ></path>
                      <path
                        d="M8.76945593,17.4828869 L14.1939212,14.0196078 L18.2867527,16.6963836 L4.14882163,25.9150327 L4.14882163,25.9150327 C4.14882163,22.4998846 5.89095741,19.3206798 8.76945593,17.4828869 Z"
                        id="Path-39-Copy-2"
                        fill="url(#linearGradient-2)"
                        transform="translate(11.217787, 19.967320) scale(-1, 1) translate(-11.217787, -19.967320) "
                      ></path>
                      <path
                        d="M0.183304389,2.48689958e-13 L13.1143389,8.49673203 L9.42310099,10.9017055 L9.42310099,10.9017055 C4.36778167,11.0371959 0.159798979,7.04888649 0.0243085926,1.99356717 C0.00937841938,1.43650334 0.0453320846,0.879239543 0.13172203,0.32871271 L0.183304389,2.48689958e-13 Z"
                        id="Path-38-Copy-3"
                        fill="url(#linearGradient-3)"
                      ></path>
                      <path
                        d="M4.54131151,6.55708742 L19.8945577,16.6535948 L16.2033199,19.0585682 L11.1830136,17.9470593 C6.34348625,16.8755752 3.2888836,12.0837536 4.36036765,7.24422626 C4.41158805,7.01288123 4.47194996,6.78365535 4.54131151,6.55708742 L4.54131151,6.55708742 Z"
                        id="Path-38-Copy-2"
                        fill="url(#linearGradient-4)"
                        transform="translate(12.021690, 12.807828) scale(-1, 1) translate(-12.021690, -12.807828) "
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            <span class="text">DevUI</span>
          </a>
        </h1>
        <div class="main-nav">
          <a class="main-nav-item" target="_self" href="/design-cn">
            <span>设计体系</span>
          </a>
          <a class="main-nav-item" routerLink="components">
            <span>组件</span>
          </a>
          <a class="main-nav-item" target="_self" href="/icon">
            <span>图标库</span>
          </a>
          <a
            class="main-nav-item"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/DevCloudFE/ng-devui/releases"
          >
            <span>版本历程</span>
          </a>
          <span class="main-nav-item">
            <!-- TODO: 版本下拉框 d-select -->
          </span>
          <span class="main-nav-item">
            <!-- TODO: 主题选择器 d-dropdown -->
          </span>
        </div>
        <div id="headerMenu" class="header-menu"><span></span></div>
      </header>
    </div>
    <!-- <app-content></app-content> -->
    <router-view></router-view>
    <d-button @click="confirm">Confirm</d-button>
    <d-button @click="cancel">Cancel</d-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppContent from './components/app-content.vue'
import DevUIButton from '../devui/button/button.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppContent,
    DevUIButton,
  },
  methods: {
    confirm() {
      console.log('confirm')
    },
    cancel() {
      console.log('cancel')
    }
  }
})
</script>

<style lang="scss">
@import '../devui/style/devui';
@import '../devui/style/theme/color';
@import '../devui/style/core/font';

body {
  background: $devui-base-bg;
}

@mixin menu() {
  position: fixed;
  display: block;
  font-size: $devui-font-size;
  z-index: 5;
  width: 4em;
  height: 4em;
  padding: 1em;
  transition: all 0.2s ease-out;

  span {
    position: relative;
    display: block;
    margin-top: 0.9em;

    &::before,
    &::after {
      position: absolute;
      top: -0.55em;
      content: ' ';
    }

    &::after {
      top: 0.55em;
    }

    &,
    &::before,
    &::after {
      background-color: $devui-text;
      width: 100%;
      height: 0.2em;
      transition: all 0.4s;
    }
  }

  &.active span {
    background: transparent;

    &::before {
      transform: rotate(45deg) translate(0.5em, 0.4em);
    }

    &::after {
      transform: rotate(-45deg) translate(0.4em, -0.3em);
    }
  }
}

.app-container {
  display: flex;
  flex-direction: column;
  transform: none;

  .app-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  a.main-nav-item {
    cursor: pointer;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    background: $devui-base-bg;
    box-shadow: 0 2px 4px 0 $devui-shadow;

    a {
      line-height: $line-height-base;
      color: $devui-text;
      text-decoration: none;
    }

    a:hover,
    a:focus {
      color: $devui-text;
      text-decoration: none;
    }
  }

  h1.title {
    font-size: $devui-font-size-page-title;
    margin: 0;
    font-weight: $font-title-weight;
    padding: 9px 20px;
    box-sizing: border-box;

    .logo,
    .text {
      display: inline-block;
      vertical-align: top;
    }

    .ui {
      font-weight: normal;
    }

    a:hover {
      text-decoration: none;
    }

    .internal {
      font-size: small;
      background-color: #5e7ce0;
      color: white;
      margin-left: 5px;
      font-weight: normal;
      line-height: 10px;
      display: inline-block;
      padding: 3px 4px 0;
    }
  }

  .main-nav {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }

  .header-menu {
    right: 5px;
    @include menu();

    display: none;

    span {
      &,
      &::before,
      &::after {
        background: $devui-text;
      }
    }
  }

  .main-nav-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin: 0 12px;
    color: $devui-text;
    cursor: pointer;

    & > span {
      font-size: $devui-font-size-page-title;
      line-height: $line-height-base;
    }

    &.version-label {
      cursor: default;

      &:hover,
      &:focus {
        color: inherit;
      }
    }

    &.language {
      cursor: pointer;
      min-width: 50px;
      text-align: center;

      &:hover {
        color: inherit;
        background: $devui-list-item-hover-bg;
      }
    }
  }

  a.main-nav-item {
    &:hover {
      text-decoration: none;
      color: $devui-list-item-hover-text;
    }

    &:active,
    &:focus {
      color: $devui-brand;
    }
  }

  .wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;

    .sidebar {
      box-sizing: border-box;
      position: fixed;
      top: 120px;
      bottom: 0;
      left: 0;
      width: 240px;
      margin-left: -240px;
      border-right: 1px solid $devui-dividing-line;
      height: 100%;
      overflow-y: hidden;
      z-index: 2;
      background: $devui-base-bg;
      transition: all 0.2s ease-out;

      &:hover {
        overflow-y: auto;
      }
    }

    .menu-link {
      left: 0;
      background: rgba(#000000, 0.7);
      @include menu();
    }

    .doc-viewer-container {
      width: 100%;
      margin-left: 0;
      transition: all 0.2s ease-out;

      .main {
        width: 100%;
        padding: 0 20px;
      }
    }

    &.active {
      .sidebar {
        overflow-y: auto;
        left: 240px;
      }

      .devui-components-search {
        margin-left: 0;
      }

      .doc-viewer-container {
        margin-left: 240px;
      }

      .menu-link {
        left: 240px;
      }
    }
  }

  .tabNav {
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: block;
  }

  .side-nav {
    background: $devui-base-bg;
    padding-bottom: 144px;

    ul {
      margin: 0;
    }

    .panel-body {
      padding: 0;
      background-color: $devui-base-bg;
    }

    .panel-title {
      font-size: $devui-font-size;
      font-weight: normal;
      color: $devui-placeholder;
      margin: 0;
      position: relative;
      height: 40px;
      display: flex;
      align-items: center;

      span {
        @include font-content();
      }
    }

    .panel > .panel-heading,
    .panel.panel-default > .panel-heading {
      background: $devui-base-bg;
      padding-left: 20px;
    }

    .panel {
      box-shadow: none;
    }

    [class*='panel-'] > .panel-heading {
      cursor: pointer;

      &:hover {
        color: $devui-list-item-hover-text;
      }
    }

    .panel-group .panel-heading + .panel-collapse > .panel-body {
      border: none;
    }
  }
}

.devui-menu {
  outline: none;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  z-index: 1050;
  background: $devui-base-bg;
}

.devui-menu-item {
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 20px;
  height: 40px;
  display: flex;
  align-items: center;

  &:not(.devui-menu-item-selected):hover {
    background-color: $devui-list-item-hover-bg;
  }
}

.devui-menu-item > a {
  @include font-content();

  display: block;
  color: $devui-text;
  text-decoration: none;
}

.devui-menu-item-selected {
  color: $devui-brand;
  background-color: $devui-list-item-selected-bg;
  border-right: 2px solid $devui-brand;

  a {
    color: inherit;
  }
}

.main {
  .docs-header {
    & > h1 {
      @include font-title();

      margin: 1em 0;
    }

    h3 {
      @include font-title($devui-font-size-card-title);
    }
  }
}

.demo-container {
  position: relative;
  padding-bottom: 30px;
  margin-top: 20px;
}

.demo-content {
  margin-right: 200px;
}

.demo-example {
  margin-bottom: 20px;
}

.demo-nav {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 150px;
  line-height: 24px;
}

.demo-nav .items {
  margin-top: 10px;
  cursor: pointer;
}

.demo-nav .items > li:hover {
  color: $devui-brand;
}

.demo-nav-active {
  color: $devui-brand;
}

.demo-title {
  @include font-title($devui-font-size-card-title);

  color: $devui-text;
  margin-bottom: 10px;
  height: 24px;
  display: flex;
  align-items: center;
}

.demo-text {
  @include font-content();

  color: $devui-text;
}

.readme {
  .hljs {
    background: transparent;
  }

  pre {
    background-color: $devui-base-bg;
    border: none;

    code {
      border: 1px solid $devui-dividing-line;
      overflow-x: auto;
    }
  }

  p {
    margin: 1em 0;
  }
}

@media (max-width: 1024px) {
  .app-container {
    .header-menu {
      display: block;
    }

    header {
      flex-direction: column;
      justify-items: center;

      .main-nav {
        display: none;
      }

      &.active {
        height: 100%;

        .main-nav {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-left: 20px;
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .app-container .wrapper {
    .sidebar {
      left: 240px;
    }

    .devui-components-search {
      margin-left: 0;
    }

    .doc-viewer-container {
      margin-left: 240px;
      width: calc(100% - 240px);

      .main {
        padding: 0 60px;
      }
    }

    .menu-link {
      display: none;
    }
  }
}

@media (min-width: 1280px) {
  .app-container .wrapper {
    .doc-viewer-container {
      .main {
        padding: 0 20%;
      }
    }
  }
}

.main-nav-item .show-themable {
  display: none;
  display: var(--iehack, flex);
  align-items: center;

  d-select,
  d-toggle {
    margin-right: 5px;
  }
}

.demo-example.active.anchor-active-by-anchor-link,
.demo-example.active.anchor-active-by-fragment {
  animation: hightlight-and-disapear 1 3s linear;
  outline-offset: 8px;
}

@keyframes hightlight-and-disapear {
  0% {
    outline: invert none medium;
  }

  2% {
    outline: 0 none rgba(255, 255, 255, 0);
  }

  10% {
    outline: 1px dashed $devui-brand;
  }

  50% {
    outline: 1px dashed $devui-brand;
  }

  90% {
    outline: 1px dashed rgba(255, 255, 255, 0);
  }

  99% {
    outline: 0 none rgba(255, 255, 255, 0);
  }

  100% {
    outline: invert none medium;
  }
}

.side-nav d-accordion d-accordion-list d-accordion-menu .devui-accordion-open-icon {
  display: none !important;
}

.side-nav d-accordion d-accordion-list {
  box-shadow: none !important;
}

.devui-components-search {
  padding: 24px 0 24px 16px;
  position: fixed;
  margin-left: -240px;
  transition: margin-left 0.2s;

  d-search {
    width: 215px;
  }
}
</style>