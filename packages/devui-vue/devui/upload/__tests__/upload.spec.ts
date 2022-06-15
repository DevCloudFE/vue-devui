import { mount } from '@vue/test-utils';
import { ref, nextTick, reactive } from 'vue';
import DUpload from '../src/upload';
import { useNamespace } from '../../shared/hooks/use-namespace';

const dotNs = useNamespace('upload', true);
const dotInputGroupNs = useNamespace('input-group', true);

const dotInputGroupClass = dotInputGroupNs.b();
const dotUploadClass = dotNs.b();
const dotUploadPlaceholder = dotNs.e('placeholder');

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get() {
      return files;
    },
  });
};

describe('upload', () => {
  it('should render correctly', () => {
    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
          <d-upload
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
        />
        `,
      setup() {
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        });
        const uploadedFiles = ref([]);
        return {
          uploadedFiles,
          uploadOptions,
        };
      },
    };
    mount(TestComponent);
  });
  it('should work with `disabled` prop', () => {
    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
          <d-upload
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          :disabled="true"
        />
        `,
      setup() {
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        });
        const uploadedFiles = ref([]);
        return {
          uploadedFiles,
          uploadOptions,
        };
      },
    };
    const wrapper = mount(TestComponent);
    expect(wrapper.find(`${dotInputGroupClass}.disabled`).exists()).toBe(true);
  });
  it('should work with `before-upload auto-upload withoutBtn` prop', async () => {
    const beforeUpload = jest.fn(async () => true);

    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
          <d-upload
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          :before-upload="beforeUpload"
          :auto-upload="true"
          :withoutBtn="true"
        />
        `,
      setup() {
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        });
        const uploadedFiles = ref([]);
        return {
          uploadedFiles,
          uploadOptions,
          beforeUpload,
        };
      },
    };
    const wrapper = mount(TestComponent);
    const uploadElment = wrapper.find(dotInputGroupClass);
    await uploadElment.trigger('click');
    await nextTick();
    const input = document.getElementById('d-upload-temp');
    const fileList = [
      new File(['test'], 'file.txt', {
        type: 'text/plain',
        lastModified: Date.now(),
      }),
    ];
    getMockFile(input, fileList);
    const evt = new Event('change');
    await input.dispatchEvent(evt);
    expect(beforeUpload).toHaveBeenCalled();
    expect(wrapper.find(`${dotUploadClass} button`).exists()).toBe(false);
  });
  it('should work with `placeholder` prop', async () => {
    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
          <d-upload
          :upload-options="uploadOptions"
          v-model:uploaded-files="uploadedFiles"
          placeholder="select file"
        />
        `,
      setup() {
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        });
        const uploadedFiles = ref([]);
        return {
          uploadedFiles,
          uploadOptions,
        };
      },
    };
    const wrapper = mount(TestComponent);
    expect(wrapper.find(dotUploadPlaceholder).text()).toBe('select file');
  });
  it('should work with `on-exceed` prop', async () => {
    const onExceed = jest.fn(async () => true);

    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
          <d-upload
          :upload-options="uploadOptions"
          :uploaded-files="uploadedFiles"
          multiple
          :limit="1"
          :on-exceed="onExceed"
        />
        `,
      setup() {
        const uploadOptions = reactive({
          uri: 'http://localhost:4000/files/upload',
        });
        const uploadedFiles = ref([]);
        return {
          uploadedFiles,
          uploadOptions,
          onExceed,
        };
      },
    };
    const wrapper = mount(TestComponent);
    const uploadElment = wrapper.find(dotInputGroupClass);
    await uploadElment.trigger('click');
    await nextTick();
    const input = document.getElementById('d-upload-temp');
    const fileList = [
      new File(['test'], 'file1.txt', {
        type: 'text/plain',
        lastModified: Date.now(),
      }),
      new File(['test'], 'file2.txt', {
        type: 'text/plain',
        lastModified: Date.now(),
      }),
    ];
    getMockFile(input, fileList);
    const evt = new Event('change');
    await input.dispatchEvent(evt);
    expect(onExceed).toHaveBeenCalled();
  });
});
