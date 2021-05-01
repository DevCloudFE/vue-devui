import { defineComponent } from 'vue';
import DevuiAvatar from '../../avatar';

export default defineComponent({
    name: 'd-avatar-basic',
    setup() {
        return () => {
            return (
                <div>
                    <DevuiAvatar style="text-align: right;" gender="Female" name="组件头像"></DevuiAvatar>
                    <DevuiAvatar name="MyAvatar"></DevuiAvatar>
                    <DevuiAvatar name="Avatar1 Avatar2"></DevuiAvatar>
                    <DevuiAvatar name="1Avatar"></DevuiAvatar>
                </div>
            )
        }
    }
})