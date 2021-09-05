import { createComponent, unmountComponent } from '../../shared/scripts/component';
export default {
  beforeMount(el, bind, vnode) {
    console.log(el, bind, vnode);
  },
}
