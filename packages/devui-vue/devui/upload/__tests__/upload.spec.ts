import { mount } from '@vue/test-utils';
import { ref, nextTick, reactive } from 'vue';
import DUpload from '../src/upload';
import { useNamespace } from '../../shared/hooks/use-namespace';

jest.mock('../../locale/create', () => ({
  createI18nTranslate: () => jest.fn(),
}));

const dotNs = useNamespace('upload', true);
const dotInputGroupNs = useNamespace('input-group', true);
const dotProgressNs = useNamespace('progress', true);

const dotInputGroupClass = dotInputGroupNs.b();
const dotUploadClass = dotNs.b();
const dotUploadPlaceholder = dotNs.e('placeholder');
const dotUploadFileItem = dotNs.e('file-item');
const dotProgressClass = dotProgressNs.b();

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

  it('should work with `before-upload auto-upload withoutBtn http-request` prop', async () => {
    const beforeUpload = jest.fn(async () => true);
    const httpRequest = jest.fn(async () => true);

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
          :http-request="httpRequest"
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
          httpRequest,
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
    await nextTick();
    expect(httpRequest).toHaveBeenCalled();
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

  it('should work with `limit on-exceed` prop', async () => {
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

  it('should work with `auto-upload  on-change` prop and `submit` func', async () => {
    const onChange = jest.fn(async () => true);

    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
        <div>
          <d-upload ref="demoUpload" v-model="uploadedFiles" :upload-options="uploadOptions" :auto-upload="false" :on-change="onChange" />
          <d-button @click="submit" style="margin-top: 20px">手动上传</d-button>
        </div>
        `,
      setup() {
        const uploadedFiles = ref([]);
        const uploadOptions = ref({
          uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
        });
        const demoUpload = ref(null);
        const submit = () => {
          demoUpload.value.submit();
        };

        return {
          uploadedFiles,
          uploadOptions,
          demoUpload,
          submit,
          onChange,
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
    ];
    getMockFile(input, fileList);
    const evt = new Event('change');
    await input.dispatchEvent(evt);
    expect(onChange).toHaveBeenCalled();

    await nextTick();
    expect(wrapper.find(dotUploadFileItem).exists()).toBe(true);
    expect(wrapper.find(dotProgressClass).exists()).toBe(false);

    const button = wrapper.find('button');
    await button.trigger('click');
    await nextTick();
    expect(wrapper.find(dotProgressClass).exists()).toBe(true);
  });

  it('should work with `on-progress on-preview` hooks', async () => {
    const onProgress = jest.fn();
    const onPreview = jest.fn();

    const TestComponent = {
      components: {
        'd-upload': DUpload,
      },
      template: `
        <div>
          <d-upload v-model="uploadedFiles" :upload-options="uploadOptions" :on-progress="onProgress" :on-preview="onPreview" />
        </div>
        `,
      setup() {
        const uploadedFiles = ref([]);
        const uploadOptions = ref({
          uri: 'https://run.mocky.io/v3/132b3ea3-23ea-436b-aed4-c43ef9d116f0',
        });

        return {
          uploadedFiles,
          uploadOptions,
          onProgress,
          onPreview,
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
    ];
    getMockFile(input, fileList);
    const evt = new Event('change');
    await input.dispatchEvent(evt);
    await nextTick();
    expect(onProgress).toHaveBeenCalled();

    const uploadedFile = wrapper.find('li');
    await uploadedFile.trigger('click');
    await nextTick();
    expect(onPreview).toHaveBeenCalled();
  });

  it.todo('method submit work well.');

  it.todo('method clearFiles work well.');
});
