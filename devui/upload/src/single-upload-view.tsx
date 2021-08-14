import './upload.scss'

import { defineComponent } from 'vue'
import { singleUploadViewProps } from './upload-types'
import { useUpload } from './use-upload'

export default defineComponent({
  name: 'DSingleUploadView',
  props: singleUploadViewProps,
  // setup(props) {},
  render() {
    const {} = this
    return <div></div>
  },
})
