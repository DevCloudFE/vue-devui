<script setup lang="ts">
import { useSideBar } from '../composables/sideBar'
import { SideBarLink } from './SideBarLink'
import { watch, reactive, ref } from 'vue'

const items = useSideBar()

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
</template>
