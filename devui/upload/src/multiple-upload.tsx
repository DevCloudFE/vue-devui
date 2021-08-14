import './upload.scss'

import { defineComponent, toRefs } from 'vue'
import { uploadProps, UploadProps, UploadStatus } from './upload-types'

export default defineComponent({
  name: 'DUpload',
  props: uploadProps,
  emits: [],
  setup(props: UploadProps, ctx) {
    const { uploadOptions, fileOptions, placeholderText } = toRefs(props)
    const uploadStatus = UploadStatus

    return {
      placeholderText,
    }
  },
  render() {
    const { placeholderText } = this

    return (
      <div class="devui-upload">
        <div class="devui-input-group">
          <div class="devui-form-control devui-files-list">
            <div class="devui-file-item devui-upload-placeholder">
              {placeholderText}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
