import { mount } from '@vue/test-utils'
import { ref, nextTick, reactive } from 'vue'
import DSingleUpload from '../src/single-upload'
import DMultipleUpload from '../src/multiple-upload'
const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get() {
      return files
    },
  })
}

describe('single upload', () => {
  it('should render correctly', () => {
    const TestComponent = {
      components: {
        'd-single-upload': DSingleUpload,
      },
      template: `
          <d-single-upload
          :file-options="fileOptions"
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
        />
        `,
      setup() {
        const fileOptions = reactive({
          accept: '',
          multiple: false,
          webkitdirectory: false,
        })
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        })
        const uploadedFiles = ref([])
        return {
          fileOptions,
          uploadedFiles,
          uploadOptions,
        }
      },
    }
    mount(TestComponent)
  })
  it('should work with `disabled` prop', () => {
    const TestComponent = {
      components: {
        'd-single-upload': DSingleUpload,
      },
      template: `
          <d-single-upload
          :file-options="fileOptions"
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          :disabled="true"
        />
        `,
      setup() {
        const fileOptions = reactive({
          accept: '',
          multiple: false,
          webkitdirectory: false,
        })
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        })
        const uploadedFiles = ref([])
        return {
          fileOptions,
          uploadedFiles,
          uploadOptions,
        }
      },
    }
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.devui-input-group.disabled').exists()).toBe(true)
  })
  it('should work with `before-upload auto-upload withoutBtn` prop', async () => {
    const beforeUpload = jest.fn(async () => true)

    const TestComponent = {
      components: {
        'd-single-upload': DSingleUpload,
      },
      template: `
          <d-single-upload
          :file-options="fileOptions"
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          :before-upload="beforeUpload"
          :auto-upload="true"
          :withoutBtn="true"
        />
        `,
      setup() {
        const fileOptions = reactive({
          accept: '',
          multiple: false,
          webkitdirectory: false,
        })
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        })
        const uploadedFiles = ref([])
        return {
          fileOptions,
          uploadedFiles,
          uploadOptions,
          beforeUpload,
        }
      },
    }
    const wrapper = mount(TestComponent)
    const uploadElment = wrapper.find('.devui-input-group')
    await uploadElment.trigger('click')
    await nextTick()
    const input = document.getElementById('d-upload-temp')
    const fileList = [new File(['test'], 'file.txt')]
    getMockFile(input, fileList)
    const evt = new Event('change')
    await input.dispatchEvent(evt)
    expect(beforeUpload).toHaveBeenCalled()
    expect(wrapper.find('.devui-upload button').exists()).toBe(false)
  })
  it('should work with `showTip placeholderText uploadText` prop', async () => {
    const TestComponent = {
      components: {
        'd-single-upload': DSingleUpload,
      },
      template: `
          <d-single-upload
          :file-options="fileOptions"
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          :showTip="true"
          placeholderText="select file"
          uploadText="upload"
        />
        `,
      setup() {
        const fileOptions = reactive({
          accept: '',
          multiple: false,
          webkitdirectory: false,
        })
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        })
        const uploadedFiles = ref([])
        return {
          fileOptions,
          uploadedFiles,
          uploadOptions,
        }
      },
    }
    const wrapper = mount(TestComponent)
    expect(wrapper.find('.devui-upload-tip').exists()).toBe(true)
    expect(wrapper.find('.devui-upload-placeholder').text()).toBe('select file')
    expect(wrapper.find('.devui-upload button').text()).toBe('upload')
  })
})

describe('multi upload', () => {
  it('should render correctly', () => {
    const TestComponent = {
      components: {
        'd-multi-upload': DMultipleUpload,
      },
      template: `
          <div>
            <d-multi-upload
            :file-options="fileOptions"
            :upload-options="uploadOptions"
            v-model:uploaded-files="uploadedFiles"
          />
          </div>
        `,
      setup() {
        const fileOptions = reactive({
          accept: '',
          multiple: true,
          webkitdirectory: false,
        })
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        })
        const uploadedFiles = ref([])
        return {
          fileOptions,
          uploadedFiles,
          uploadOptions,
        }
      },
    }
    mount(TestComponent)
  })
})
