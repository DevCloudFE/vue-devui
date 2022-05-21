import { mount } from '@vue/test-utils';
import DCard from '../src/card';
import DAvatar from '../../avatar/src/avatar';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('card', true);
const avatar = useNamespace('avatar');

const avatarBaseClass = avatar.b();
const titleClass = ns.e('title');
const subtitleClass = ns.e('subtitle');
const contentClass = ns.e('content');
const actionsClass = ns.e('actions');
const metaClass = ns.e('meta');
const cardBlockClass = '.card-block';
const spaceBetweenClass = `${ns.em('actions', 'align')}-spaceBetween`;

describe('card', () => {
  it('should render correctly', async () => {
    const wrapper = mount(DCard);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        DCard,
        DAvatar
      },
      template: `
        <d-card class="d-card">
          <template #avatar>
            <d-avatar name="DevUI"></d-avatar>
          </template>
        </d-card>
      `,
    });
    const avatarComponent = wrapper.findAllComponents({ name: 'dAvatar' })[0];
    expect(avatarComponent.classes()).toContain(avatarBaseClass);
  });

  it('in v-slot mode should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        DCard,
        DAvatar
      },
      template: `
        <d-card class="d-card">
          <template v-slot:avatar>
            <d-avatar name="DevUI"></d-avatar>
          </template>
        </d-card>
      `,
    });
    const avatarComponent = wrapper.findAllComponents({ name: 'dAvatar' })[0];
    expect(avatarComponent.classes()).toContain(avatarBaseClass);
  });

  it('should render correctly title', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #title>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(titleClass).text()).toBe('DevUI');
  });

  it('in v-slot mode should render title', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:title>
            DEVUI Course
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(titleClass).text()).toBe('DEVUI Course');
  });

  it('should render correctly subtitle', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #subtitle>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(subtitleClass).text()).toBe('DevUI');
  });

  it('in v-slot mode should render subtitle', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:subtitle>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(subtitleClass).text()).toBe('DevUI');
  });

  it('should render correctly content', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #content>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(contentClass).text()).toBe('DevUI');
  });

  it('in v-slot mode should render content', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:content>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(contentClass).text()).toBe('DevUI');
  });

  it('should render correctly actions', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #actions>
            <div class="card-block">
              btn
            </div>
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(actionsClass).exists()).toBeTruthy();
    expect(wrapper.find(cardBlockClass).text()).toBe('btn');
  });

  it('in v-slot mode should render actions', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #actions>
            <div class="card-block">
              btn
            </div>
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find(actionsClass).exists()).toBeTruthy();
    expect(wrapper.find(cardBlockClass).text()).toBe('btn');
  });

  it('should render correctly image', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card" :src="'https://devui.design/components/assets/image1.png'">
        </d-card>
      `,
    });
    expect(wrapper.find(metaClass).attributes('src').includes('https://devui.design/components/assets/image1.png')).toBeTruthy();
  });

  it('should render correctly align', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card" :align="'spaceBetween'">
        </d-card>
      `,
    });
    expect(wrapper.find(spaceBetweenClass).exists()).toBeTruthy();
  });
});
