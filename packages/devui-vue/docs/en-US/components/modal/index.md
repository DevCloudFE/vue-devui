# Modal

Modal dialog.

#### When to use

1.When requiring users to interact with the application, but without jumping to a new page and interrupting the user's workflow, you can use Modal to create a new floating layer over the current page to get user feedback or display information. 

2.Modal plays an interactive role with users. Users can enter information, read prompts, set options and other operations in Modal.


### Basic Usage

:::demo `v-model` bidirectional binding, which controls whether Modal is displayed. `title` as parameter is to set modal title.

```vue
<template>
  <d-button @click="handleClick">open modal</d-button>
  <d-modal v-model="visible" title="Start Snapshot Version">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };

    return { visible, data, handleClick };
  },
});
</script>
```

:::

### Keep Last Closed Position

:::demo `keep-last` can keep the last closed position when the current modal is opened again.

```vue
<template>
  <d-button @click="handleClick">open modal</d-button>
  <d-modal v-model="visible" title="Start Keep Last" :keep-last="true">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };

    return { visible, data, handleClick };
  },
});
</script>
```

:::

### Customize Title & Action Buttons

:::demo `header` slot can customize Modal top area, subcomponent `d-modal-header` provides a default style for the top area, customized styles can be implemented by setting `style/class` in subcomponent. `footer` slot is the same.

```vue
<template>
  <d-button @click="handleClick">open modal</d-button>
  <d-modal v-model="visible">
    <template #header>
      <d-modal-header>
        <d-icon name="like"></d-icon>
        <span>Good Title</span>
      </d-modal-header>
    </template>
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
    <template #footer>
      <d-modal-footer style="text-align: right; padding-right: 20px;">
        <d-button @click="hidden">cancle</d-button>
        <d-button @click="hidden">confirm</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>
<script>
import { ref, defineComponent, reactive } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };
    const hidden = () => {
      visible.value = false;
    };

    return { visible, data, handleClick, hidden };
  },
});
</script>
```

:::

### Information Prompt

:::demo Various types of information prompt modals.

```vue
<template>
  <d-button class="mr-1" @click="handleClick('success')">success</d-button>
  <d-button class="mr-1" @click="handleClick('failed')">failed</d-button>
  <d-button class="mr-1" @click="handleClick('warning')">warning</d-button>
  <d-button class="mr-1" @click="handleClick('info')">info</d-button>
  <d-modal v-model="visible" title="Start Snapshot Version" :type="type">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
  </d-modal>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const type = ref('');
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = (t: string) => {
      visible.value = true;
      type.value = t;
    };

    return { visible, data, handleClick, type };
  },
});
</script>
```

:::

### Callback Before Closing

:::demo `before-close` called when the user clicks the close button or mask layer, you can close them through the `done` parameter after completing some asynchronous operations.

```vue
<template>
  <d-button @click="handleClick">open modal</d-button>
  <d-modal v-model="visible" :before-close="beforeClose" style="width: 500px;">
    <div>name: {{ data.name }}</div>
    <div>age: {{ data.age }}</div>
    <div>address: {{ data.address }}</div>
    <template #footer>
      <d-modal-footer style="text-align: right; padding-right: 20px;">
        <d-button @click="hidden">cancel</d-button>
        <d-button @click="hidden">confirm</d-button>
      </d-modal-footer>
    </template>
  </d-modal>
</template>

<script>
import { ref, defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const data = reactive({
      name: 'Tom',
      age: 20,
      address: 'Chengdu',
    });
    const handleClick = () => {
      visible.value = true;
    };
    const hidden = () => {
      visible.value = false;
    };
    const beforeClose = (done) => {
      new Promise((resolve) => {
        setTimeout(resolve, 1000);
      }).then(done);
    };

    return { visible, data, handleClick, hidden, beforeClose };
  },
});
</script>
```

:::

### API

|      Parameter        |       Type      |      Default     |     Description   |   Jump to Demo |
| :-------------------: | :--------------: | :---------------------: | :--------------------------------------------: | :-------------------: |
| v-model                | `boolean`                            | false  | Whether Modal is displayed                             | [Basic Usage](#basic-usage)     |
| title                  | `string`                             | -      | Optional, Title of Modal                         | [Basic Usage](#basic-usage)     |
| keep-last              | `boolean`                            | false  | Optional, whether to keep the last moved position  | [Keep Last Closed Position](#keep-last-closed-position)  
| lock-scroll            | `boolean`                            | true   | Optional, whether to lock the body scrolling                 |
| close-on-click-overlay | `boolean`                            | true   | Optional, whether Modal can be closed when clicking the blank           |
| before-close           | `(done) => void`                     | -      | Optional, callback before closing, call `done` to close Modal | [Callback Before Closing](#callback-before-closing) |
| escapable              | `boolean`                            | true   | Optional, whether the `esc` key is supported to close the modal              |                           |
| show-close             | `boolean`                            | true   | Optional, whether to display the close button                     |                           |
| draggable              | `boolean`                            | true   | Optional, whether modal can be dragged                       |
| show-animation         | `boolean`                            | true   | Optional, whether to display animation                         |
| show-overlay           | `boolean`                            | true   | Optional, whether to display mask layer                       |                           |
| append-to-body         | `boolean`                            | true   | Optional, whether to promote Modal to the body layer          |                           |
| type                   | success \| failed \| warning \| info | -      | Optional, modal information prompt                         |

### Modal Slot

| Slot name  | Description    |
| :------ | :---------------- |
| default | Modal content        |
| header  | Custom Modal header |
| footer  | Custom Modal footer |
