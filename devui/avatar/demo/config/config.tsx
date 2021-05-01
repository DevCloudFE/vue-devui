import { defineComponent } from 'vue';

import DevuiAvatar from '../../avatar';

export default defineComponent({
    name: 'd-avatar-config',
    setup() {
        const imgSrc = '/public/logo.svg';
        return () => {
            return (
                <div style="display: flex; align-items: center">
                    <DevuiAvatar name="Avatar" width={28} height={28}></DevuiAvatar>
                    <DevuiAvatar customText={'DevUI'} width={80} height={80} isRound={false}></DevuiAvatar>
                    <DevuiAvatar imgSrc={imgSrc} width={100} height={100} isRound={false}></DevuiAvatar>
                </div>
            )
        }
    }
})