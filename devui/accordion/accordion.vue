<template>
  <ul class="devui-accordion-list" v-if="!innerListTemplate || deepth === 0">
    <li class="devui-accordion-item" v-for="category in data" :key="category.title">
      <div
        class="devui-accordion-item-title devui-over-flow-ellipsis"
        :class="{
          open: open,
          active: childActived,
          disabled: disabled
        }"
        :title="category.title"
        @click="!disabled && toggle($event)"
      >
        <div
          class="devui-accordion-splitter"
          :class="{
            'devui-parent-list': deepth === 0
          }"
          :style="{ left: deepth * 20 + 10 + 'px' }"
        ></div>
        {{ category.title }}
      </div>
      <ul class="devui-accordion-submenu">
        <li class="devui-accordion-item" v-for="component in category.children" :key="component.title">
          <router-link :to="component.link">{{ component.title }}</router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'd-accordion',
  props: {
    data: Object,
    linkType: String
  },
  setup(props) {
    const { data, linkType } = props;
    console.log('props:', props);
    console.log('data:', data);
    console.log('linkType:', linkType);
  }
})
</script>

<style lang="scss">
@import '../style/mixins/index';
@import '../style/theme/color';
@import '../style/theme/shadow';
@import '../style/theme/corner';

:host {
  display: block;
}

d-accordion-menu,
d-accordion-item,
d-accordion-item-hreflink,
d-accordion-item-routerlink,
d-accordion-list {
  display: block;
}

/* 菜单底色 */
.devui-accordion-menu {
  display: block;
  background: $devui-base-bg;
  width: 100%;
  overflow-y: auto;
  border-radius: $devui-border-radius;
  height: 100%;

  &.devui-accordion-menu-normal {
    box-shadow: $devui-shadow-length-base $devui-shadow;
  }

  & > .devui-accordion-list {
    padding: 10px 0;
  }

  .devui-over-flow-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.devui-accordion-submenu {
  background: $devui-base-bg;
  width: 100%;
}

/* 单行菜单 */
.devui-accordion-item-title {
  display: block;
  height: 40px;
  width: 100%;
  padding: 0 10px 0 20px;
  font-weight: 400;
  line-height: 40px;
  color: $devui-text-weak;
  background: transparent;
  cursor: pointer;

  &.disabled {
    color: $devui-disabled-text;
    cursor: not-allowed;

    & > a {
      color: $devui-disabled-text;
    }
  }

  &:not(.disabled) {
    &:hover {
      background: $devui-list-item-hover-bg;
      color: $devui-list-item-hover-text;
    }

    &.devui-router-active,
    &.active:not(.open) {
      color: $devui-brand-active;
      font-weight: bold;

      & > a {
        color: $devui-brand-active;
      }
    }
  }

  & > a {
    text-decoration: none;
    display: block;
    width: 100%;
    color: $devui-text-weak;

    &:hover {
      color: inherit;
      text-decoration: none;
    }
  }
}

/* 解决链接可点击区域大小不是100%宽度问题 */
d-accordion-item-hreflink,
d-accordion-item-routerlink {
  &.devui-accordion-item-title {
    padding: 0;

    & > a {
      padding: 0 10px 0 20px;
    }
  }
}

/* 展开图标相关 */
.devui-accordion-menu-item > .devui-accordion-item-title {
  position: relative;

  & > .devui-accordion-open-icon {
    display: inline-block;
    text-indent: 0;
    pointer-events: none; /* 让鼠标穿透 */
    position: absolute;
    right: 10px;
    top: 12px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    transition: transform ease-out 0.3s;

    & > svg {
      width: 16px;
      height: 16px;

      polygon {
        fill: $devui-text-weak;
      }
    }
  }

  &:not(.open) {
    &.active {
      svg polygon {
        fill: $devui-icon-fill-active;
      }
    }

    & > .devui-accordion-open-icon {
      transform: rotate(-180deg);
      transform-origin: center;
    }
  }

  &.disabled > .devui-accordion-open-icon {
    color: $devui-disabled-text;

    svg polygon {
      fill: $devui-disabled-text;
    }
  }
}

/* 可展开的菜单 */
.devui-accordion-menu-item > .devui-accordion-item-title {
  padding-right: 30px;

  &.active:not(.open) {
    color: $devui-brand-active;
    background: transparent;
  }
}

d-accordion-list.devui-accordion-menu-hidden {
  display: none;
}

/* 视觉融合灰线 */
.devui-accordion-item-title {
  position: relative;

  .devui-accordion-splitter {
    position: absolute;
    display: inline-block;
    left: 10px;
    width: 2px;
    height: 40px;
    background: $devui-dividing-line;
    vertical-align: middle;

    &.devui-parent-list {
      background-color: transparent;
    }
  }

  &.devui-router-active,
  &.active {
    &:not(.open) .devui-accordion-splitter::before {
      content: '';
      display: block;
      width: 2px;
      height: 18px;
      background: $devui-form-control-line-active;
      position: absolute;
      top: 11px;
      left: 0;
    }
  }
}

.devui-accordion-list > .devui-accordion-item:first-child {
  & > .devui-accordion-item-title,
  & > .devui-accordion-menu-item > .devui-accordion-item-title {
    & > a > .devui-accordion-splitter,
    & > .devui-accordion-splitter {
      height: 28px;
      top: 12px;

      &::before {
        top: 0;
      }
    }
  }
}

.devui-accordion-list > .devui-accordion-item:last-child {
  & > .devui-accordion-item-title,
  & > .devui-accordion-menu-item > .devui-accordion-item-title {
    & > a > .devui-accordion-splitter,
    & > .devui-accordion-splitter {
      height: 28px;
      top: 0;

      &::before {
        top: initial;
        bottom: 0;
      }
    }
  }
}

.devui-accordion-list > .devui-accordion-item:last-child:first-child {
  & > .devui-accordion-item-title,
  & > .devui-accordion-menu-item > .devui-accordion-item-title {
    & > a > .devui-accordion-splitter,
    & > .devui-accordion-splitter {
      height: 18px;
      top: 11px;
    }
  }
}

.devui-accordion-item > a {
  padding: 0 10px 0 20px;
  color: var(--devui-text-weak,#575d6c);
  display: block;
  text-decoration: none;
  width: 100%;
}

</style>