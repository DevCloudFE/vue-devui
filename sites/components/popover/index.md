# Popover 悬浮提示  

<d-popover content="popover" position="left-top"  visible>
<!-- 使用v-slot缩写#报错，可能是与markdown语法冲突了 -->
   <template v-slot:content>
      <span >我是内容权scvsvsvs权根本</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="common">contentdev</d-button>
  </template>
</d-popover>

```html
<d-popover content="popover" position="left-top"  visible>
   <template v-slot:content>
      <span >我是内容权scvsvsvs权根本</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="common">contentdev</d-button>
  </template>
</d-popover>
```