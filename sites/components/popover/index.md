# Popover 悬浮提示  

<div>
  <d-popover content="default" style="margin-left:5px;" position="left">
    <template #content>
        <div>left</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">default</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="left-top" popType="info">
    <template #content>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button bsStyle="primary">left-top</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="left-bottom" popType="error">
    <template #content>
        <span>left-bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">left-bottom</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top" popType="error">
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top-left" popType="error">
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top-left</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top-right" popType="error">
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top-right</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="right" popType="error">
    <template #content>
        <span >right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="right-top" popType="error">
    <template #content>
        <span >right-top</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right-top</d-button>
    </template>
  </d-popover>
    <d-popover content="popover" style="margin-left:5px;" position="right-bottom" popType="error">
    <template #content>
        <span >right-bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right-bottom</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="bottom" popType="error">
    <template #content>
        <span >bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom</d-button>
    </template>
  </d-popover>
    <d-popover content="popover" style="margin-left:5px;" position="bottom-left" popType="error">
    <template #content>
        <span >bottom-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="bottom-right" popType="error">
    <template #content>
        <span >bottom-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom-right</d-button>
    </template>
  </d-popover>
</div>

```html
  <d-popover content="default" style="margin-left:5px;" position="left">
    <template #content>
        <div>left</div>
      </template>
    <template #reference>
      <d-button bsStyle="common">default</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="left-top" popType="info">
    <template #content>
        <div>left-top</div>
    </template>
    <template #reference>
      <d-button bsStyle="primary">left-top</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="left-bottom" popType="error">
    <template #content>
        <span>left-bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">left-bottom</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top" popType="error">
    <template #content>
        <span >top</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top-left" popType="error">
    <template #content>
        <span >top-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top-left</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="top-right" popType="error">
    <template #content>
        <span >top-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">top-right</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="right" popType="error">
    <template #content>
        <span >right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="right-top" popType="error">
    <template #content>
        <span >right-top</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right-top</d-button>
    </template>
  </d-popover>
    <d-popover content="popover" style="margin-left:5px;" position="right-bottom" popType="error">
    <template #content>
        <span >right-bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">right-bottom</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="bottom" popType="error">
    <template #content>
        <span >bottom</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom</d-button>
    </template>
  </d-popover>
    <d-popover content="popover" style="margin-left:5px;" position="bottom-left" popType="error">
    <template #content>
        <span >bottom-left</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom-left</d-button>
    </template>
  </d-popover>
  <d-popover content="popover" style="margin-left:5px;" position="bottom-right" popType="error">
    <template #content>
        <span >bottom-right</span>
      </template>
    <template #reference>
      <d-button bsStyle="danger">bottom-right</d-button>
    </template>
  </d-popover>
```

