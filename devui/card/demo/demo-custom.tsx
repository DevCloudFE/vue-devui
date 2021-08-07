import { defineComponent } from 'vue';
import DCard from '../src/card';
import './basic.component.scss';
import DevuiAvatar from '../../avatar/avatar';
export default defineComponent({
  name: 'DemoBasic',

  setup () {
    const cardAvatar=<DevuiAvatar name="DevUI"></DevuiAvatar>
    const cardTitle='DEVUI Course'
    const cardSubtitle=<><i class="icon-company-member card-icon"></i><span>DevUI</span></>
    const cardActions=<>
    <div class="card-block">
      <d-icon name="icon-like" class="icon-like card-icon"></d-icon><span>12</span>
    </div>
    <div class="card-block">
      <d-icon name="icon-star-o" class="icon-like card-icon"></d-icon ><span>8</span>
    </div>
    <div class="card-block">
      <d-icon name="icon-message" class="icon-like card-icon"></d-icon ><span>8</span>
    </div></>
    const slots = {
      cardAvatar:()=>cardAvatar,
      cardTitle:()=>cardTitle,
      cardSubtitle:()=>cardSubtitle,
      cardContent: () =>'DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...',
      cardActions: ()=>cardActions
    };
    return () => {
      return (
        <DCard class="d-card" align="start" v-slots={slots}></DCard>);
    };
  }
});
