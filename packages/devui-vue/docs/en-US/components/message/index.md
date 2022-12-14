# Message

It is often used for feedback prompt after active operation. The difference with Notification is that the latter is more used for passive reminders of system level notifications.

### When To Use

It is used when needs to display the prompt information globally to the user, and will disappear after a few seconds.

### Basic Usage

There are 4 types of `Message`：normal、success、error、warning、info。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="open('normal')">normal</d-button>
    <d-button  @click="open('success')">success</d-button>
    <d-button  @click="open('error')">error</d-button>
    <d-button  @click="open('warning')">warning</d-button>
    <d-button  @click="open('info')">info</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function open (type) { 
      this.$message({
        type,
        message: 'this is a message.'
      })
    }
    
    return { open };
  }
});
</script>
```
:::

### Closable Prompt

The default Message cannot be closed manually. If you need to manually close, you can set `showClose` to `true`. In addition, the default duration time is 3000 milliseconds. Setting the value of this attribute (`duration`) to 0 means that the message will not be automatically closed.

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeIcon()">show close icon</d-button>
    <d-button  @click="notClose()">not close</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeIcon () {
      this.$message({
        type:'success',
        message:'Show close button.',
        showClose: true,
      });
    }

    function notClose () {
      this.$message({
        type:'info',
        message:'Do not automatically close messages.',
        showClose: true,
        duration: 0
      });
    }
    
    return { closeIcon, notClose };
  }
});
</script>
```

:::

### Duration

By setting `duration` to specify the time displayed by `message` in milliseconds (1000ms => 1 second), setting this attribute to 0 will not automatically close.

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="open()">show message 5000ms</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function open () { 
      this.$message({
        type:'success',
        message:'show message 5000ms.',
        duration: 5000,
        showClose: true,
      });
    }
    
    return { open };
  }
});
</script>
```


:::

### Shadow & Bordered Setting

Remove the border of `message` by setting `bordered` to `false`.

Remove the shadow of `message` by setting `shadow` to `false`.

:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeBordered()">close bordered</d-button>
    <d-button  @click="closeShadow()">close shadow</d-button>
    <d-button  @click="closeBAndS()">close bordered And shadow</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeBordered () {
      this.$message({
        type:'success',
        message:'close bordered.',
        bordered: false,
      });
    }

    function closeShadow () {
      this.$message({
        type:'info',
        message:'close shadow.',
        shadow: false,
      });
    }

    function closeBAndS () {
      this.$message({
        type:'error',
        message:'close shadow.',
        bordered: false,
        shadow: false,
      });
    }
    
    return { closeBordered, closeShadow, closeBAndS };
  }
});
</script>
```

:::

### Close Callback

Set the callback when closing through the onClose parameter.
:::demo

```vue
<template>
  <div class="demo-spacing">
    <d-button  @click="closeMessage()">close message</d-button>
   </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {

    function closeMessage () {
      this.$message({
        type:'success',
        message:'close message.',
        onClose: () => {
          console.log('message closed');
        },
      });
    }
    
    return { closeMessage };
  }
});
</script>
```

:::

### Multiple Usages

When calling message, there can be multiple calling methods and multiple usage methods.

##### Calling Methods
```javascript
// First: global call
this.$message('I call message globally');

// Second: import and local call
import { message } from 'vue-devui'
message('I call message locally')
```

##### Usage Methods
```javascript
import { message } from 'vue-devui'

// Accepting strings for default parameter
message('I am a default message');

// Accepting object for parameter
message({
  message:'I am message',
  type: 'info',
  bordered: false,
});

// Directly select type to call
message.error('I am a error message');
message.error({
  message:'I am a error message',
  bordered: false,
  shadow: false,
});
```

### API

|      Parameter        |       Type      |      Default     |     Description   |   Jump to Demo |
| :-------------------: | :--------------: | :---------------------: | :--------------------------------------------: | :-------------------: |
| message  | `string` | ''  | Set message text | [Basic Usage](#basic-usage) |
| type  | `MessageType` | 'normal'| Set message content type   | [Basic Usage](#basic-usage)   |
| showClose | `Boolean`| false | Set the display closing button | [Closable Prompt](#closable-prompt)   |
| duration | `number`| 3000   | Set duration         | [Duration](#duration)   |
| shadow | `Boolean`| true   | Set whether to display shadow        | [Shadow & Bordered Setting](#shadow-bordered-setting)   |
| bordered | `Boolean`| true   | Set whether to display border         | [Shadow & Bordered Setting](#shadow-bordered-setting)   |
| on-close | `() => void` | - | Set the callback when the message is closed | [Close Callback](#close-callback)         |


### Message Type Definition

#### MessageType

```ts
type MessageType = 'normal' | 'success' | 'error' | 'warning' | 'info';
```
