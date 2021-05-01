import { defineComponent } from 'vue';
import Alert from '../../alert';

export default defineComponent({
    name: 'd-alert-basic',
    setup() {
        return () => {
            return (
                <>
                    <Alert type="success" closeable={false}>success</Alert>
                    <Alert type="info" closeable={false}>info</Alert>
                    <Alert type="warning" closeable={false}>warning</Alert>
                    <Alert type="danger" closeable={false}>danger</Alert>
                </>
            )
        }
    }
})