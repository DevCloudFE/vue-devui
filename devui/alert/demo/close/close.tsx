import { defineComponent } from 'vue';
import DevuiAlert from '../../alert';

export default defineComponent({
    name: 'd-alert-close',
    setup() {

        const handleClose = (e?: MouseEvent) => {
            console.log(e);
        }
        return () => {
            return (
                <>
                    <DevuiAlert type="success" closeEvent={handleClose}>success</DevuiAlert>
                    <DevuiAlert type="danger" closeEvent={handleClose}>danger</DevuiAlert>
                    <DevuiAlert type="warning" closeEvent={handleClose}>warning</DevuiAlert>
                    <DevuiAlert type="info" closeEvent={handleClose}>info</DevuiAlert>
                </>
            )
        }
    }
})