import {defineComponent} from 'vue';

import './gantt-bar.scss';


export default defineComponent({
  name:'GantBar',
  props:{},
  render(){
    return (
      <div class="gantt-bar"></div>
    );
  }
});
