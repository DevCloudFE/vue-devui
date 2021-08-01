import { defineComponent } from 'vue';

import DevuiAlert from '../../alert';

export default defineComponent({
    name: 'DAlertWithoutIcon',
    setup() {
        return () => {
            return (
                <>
                    <DevuiAlert type="success" showIcon={false}>success</DevuiAlert>
                    <DevuiAlert type="danger" showIcon={false}>danger</DevuiAlert>
                    <DevuiAlert type="warning" showIcon={false}>warning</DevuiAlert>
                    <DevuiAlert type="info" showIcon={false}>info</DevuiAlert>
                </>
            )
        }
    }
})