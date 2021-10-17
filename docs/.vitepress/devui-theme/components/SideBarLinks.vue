<script setup lang="ts">
import { useSideBar } from '../composables/sideBar'
import { SideBarLink } from './SideBarLink'
import { watch, reactive, ref } from 'vue'

const items = useSideBar()

console.log('组件树:', items.value);
console.log('此时的语言:', localStorage.getItem('preferred_lang'))
const sidebarItem = {
  '/en-US/': [
     {
	    "text": "Common",
	    "children": [
	      {
	        "text": "Button",
	        "link": "/components/button/",
	        "status": "completed"
	      },
	      {
	        "text": "Fullscreen",
	        "link": "/components/fullscreen/",
	        "status": "completed"
	      },
	      {
	        "text": "Icon",
	        "link": "/components/icon/",
	        "status": "completed"
	      }
	    ]
	  },
  ]
}

</script>

<template>
  <ul v-if="items.length > 0" class="sidebar-links">
    <SideBarLink v-for="item of items" :item="item" />
  </ul>
  <!-- <ul v-if="items.length > 0" class="sidebar-links">
    <SideBarLink v-for="item of sidebarItem" :item="item" />
  </ul> -->
</template>
