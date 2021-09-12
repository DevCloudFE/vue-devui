# Popover 悬浮提示  

<d-popover content="default" style="margin-left:5px;" position="left">
<!-- 使用v-slot缩写#报错，可能是与markdown语法冲突了 -->
   <template v-slot:content>
      <div >left</div>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="common">default</d-button>
  </template>
</d-popover>

<d-popover content="popover" style="margin-left:5px;" position="left-top" popType="info">
   <template v-slot:content>
      <div>left-top</div>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="primary">left-top</d-button>
  </template>
</d-popover>

<d-popover content="popover" style="margin-left:5px;" position="left-bottom" popType="error">
   <template v-slot:content>
      <span >left-bottom</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="danger">left-bottom</d-button>
  </template>
</d-popover>

<d-popover content="popover" style="margin-left:5px;" position="top" popType="error">
   <template v-slot:content>
      <span >top</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="danger">top</d-button>
  </template>
</d-popover>

<d-popover content="popover" style="margin-left:5px;" position="top-left" popType="error">
   <template v-slot:content>
      <span >top-left</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="danger">top-left</d-button>
  </template>
</d-popover>

<d-popover content="popover" style="margin-left:5px;" position="top-right" popType="error">
   <template v-slot:content>
      <span >top-right</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="danger">top-right</d-button>
  </template>
</d-popover>

```html
<d-popover content="popover" position="top" >
   <template v-slot:content>
      <span >default</span>
    </template>
  <template v-slot:reference>
    <d-button bsStyle="default">d</d-button>
  </template>
</d-popover>

<d-popover content="popover" position="right">
   <template v-slot:content>
      <span >default</span>
    </template>
  <template v-slot:reference>
     <template v-slot:reference>
    <d-button bsStyle="info">d</d-button>
  </template>
  </template>
</d-popover>
```

