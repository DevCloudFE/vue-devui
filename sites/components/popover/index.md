# Popover 悬浮提示  

<d-popover content="default" position="left" popType="error">
<!-- 使用v-slot缩写#报错，可能是与markdown语法冲突了 -->
   <template v-slot:content>
      <span >default</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="common">default</d-button>
  </template>
</d-popover>

```html
<d-popover content="popover" position="left-top"  visible>
   <template v-slot:content>
      <span >default</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="default">d</d-button>
  </template>
</d-popover>
```