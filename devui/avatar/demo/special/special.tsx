import { defineComponent } from 'vue';

import DevuiAvatar from '../../avatar';

export default defineComponent({
    name: 'd-avatar-special',
    setup() {
        return () => {
            return (
                <div>
                    <DevuiAvatar></DevuiAvatar>
                    <DevuiAvatar name={''}></DevuiAvatar>
                </div>
            )
        }
    }
})