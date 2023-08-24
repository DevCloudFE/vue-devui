<template>
  <div>
    <d-button-group>
      <d-button variant="solid">
        按钮名称
      </d-button>
      <d-button
        icon="icon-select-arrow"
        variant="solid"
      />
    </d-button-group>

    <p>尺寸：sm</p>
    <d-button-group size="sm">
      <d-button
        color="primary"
        variant="solid"
      >
        上海
      </d-button>
      <d-button>北京</d-button>
      <d-button>深圳</d-button>
    </d-button-group>

    <p>尺寸：默认</p>
    <d-button-group>
      <d-button color="primary">
        上海
      </d-button>
      <d-button>北京</d-button>
      <d-button>深圳</d-button>
    </d-button-group>

    <p>尺寸：lg</p>
    <d-button-group size="lg">
      <d-button color="primary">
        上海
      </d-button>
      <d-button>北京</d-button>
      <d-button>深圳</d-button>
    </d-button-group>

    <p>与dropdown下拉菜单一起使用</p>
    <d-button-group>
      <d-dropdown
        style="width: 100px;"
        :position="position"
        align="start"
      >
        <d-button>Click Me 1</d-button>
        <template #menu>
          <ul class="list-menu">
            <li class="menu-item">
              Item 1
            </li>
            <li class="menu-item">
              Item 2
            </li>
            <li class="menu-item">
              Item 3
            </li>
            <li class="menu-item">
              Item 4
            </li>
          </ul>
        </template>
      </d-dropdown>
      <d-button
        icon="add"
        variant="solid"
      >
        上海
      </d-button>
      <d-dropdown
        style="width: 100px;"
        :position="position"
        align="start"
      >
        <d-button>Click Me 2</d-button>
        <template #menu>
          <ul class="list-menu">
            <li class="menu-item">
              Item 1
            </li>
            <li class="menu-item">
              Item 2
            </li>
            <li class="menu-item">
              Item 3
            </li>
            <li class="menu-item">
              Item 4
            </li>
          </ul>
        </template>
      </d-dropdown>
      <d-button icon="filter">
        北京
      </d-button>
      <d-dropdown
        style="width: 100px;"
        :position="position"
        align="start"
      >
        <d-button>Click Me 3</d-button>
        <template #menu>
          <ul class="list-menu">
            <li class="menu-item">
              Item 1
            </li>
            <li class="menu-item">
              Item 2
            </li>
            <li class="menu-item">
              Item 3
            </li>
            <li class="menu-item">
              Item 4
            </li>
          </ul>
        </template>
      </d-dropdown>
    </d-button-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const position = ref(["bottom-start", "top-start"]);
</script>
