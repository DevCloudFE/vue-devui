import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import DCard from '../src/card';
import DAvatar from '../../avatar/src/avatar';

describe('Card', () => {
    it('render', async () => {
        const wrapper = mount({
          components: {
            DCard,
            DAvatar
          },
          template: `
            <d-card class="d-card">
              <template #cardAvatar>
                <d-avatar name="DevUI"></d-avatar>
              </template>
              <template #cardTitle>
                DEVUI Course
              </template>
              <template #cardSubtitle>
                DevUI
              </template>
              <template #cardContent>
                DEVUI
              </template>
              <template #cardActions>
                <div class="card-block">
                  btn
                </div>
              </template>
            </d-card>
          `,
          
        });
    
        const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
        expect(avatar.classes()).toContain('devui-avatar');
        expect(avatar.find('.devui-avatar-style').text()).toBe('DE')
        expect(wrapper.find('.devui-card-title').text()).toBe('DEVUI Course')
        expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI')
        expect(wrapper.find('.devui-card-content').text()).toBe('DEVUI')
        expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
        expect(wrapper.find('.card-block').text()).toBe('btn')
    });
    it('v-slot:', async () => {
        const wrapper = mount({
          components: {
            DCard,
            DAvatar
          },
          template: `
            <d-card class="d-card">
              <template v-slot:cardAvatar>
                <d-avatar name="DevUI"></d-avatar>
              </template>
              <template v-slot:cardTitle>
                DEVUI Course
              </template>
              <template v-slot:cardSubtitle>
                DevUI
              </template>
              <template v-slot:cardContent>
                DEVUI
              </template>
              <template v-slot:cardActions>
                <div class="card-block">
                  btn
                </div>
              </template>
            </d-card>
          `,
          
        });
    
        const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
        expect(avatar.classes()).toContain('devui-avatar');
        expect(avatar.find('.devui-avatar-style').text()).toBe('DE')
        expect(wrapper.find('.devui-card-title').text()).toBe('DEVUI Course')
        expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI')
        expect(wrapper.find('.devui-card-content').text()).toBe('DEVUI')
        expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
        expect(wrapper.find('.card-block').text()).toBe('btn')
    });
    it('src', async () => {
        const wrapper = mount({
          components: {
            DCard,
            DAvatar
          },
          template: `
            <d-card class="d-card" :src="'https://devui.design/components/assets/image1.png'">
              <template #cardAvatar>
                <d-avatar name="DevUI"></d-avatar>
              </template>
              <template #cardTitle>
                DEVUI Course
              </template>
              <template #cardSubtitle>
                DevUI
              </template>
              <template #cardContent>
                DEVUI
              </template>
              <template #cardActions>
                <div class="card-block">
                  btn
                </div>
              </template>
            </d-card>
          `,
          
        });
    
        const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
        expect(avatar.classes()).toContain('devui-avatar');
        expect(avatar.find('.devui-avatar-style').text()).toBe('DE')
        expect(wrapper.find('.devui-card-title').text()).toBe('DEVUI Course')
        expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI')
        expect(wrapper.find('.devui-card-meta').attributes('src').includes('https://devui.design/components/assets/image1.png')).toBeTruthy();
        expect(wrapper.find('.devui-card-content').text()).toBe('DEVUI')
        expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
        expect(wrapper.find('.card-block').text()).toBe('btn')
    });
    it('src', async () => {
        const wrapper = mount({
          components: {
            DCard,
            DAvatar
          },
          template: `
            <d-card class="d-card" :align="'spaceBetween'">
              <template #cardAvatar>
                <d-avatar name="DevUI"></d-avatar>
              </template>
              <template #cardTitle>
                DEVUI Course
              </template>
              <template #cardSubtitle>
                DevUI
              </template>
              <template #cardContent>
                DEVUI
              </template>
              <template #cardActions>
                <div class="card-block">
                  btn
                </div>
              </template>
            </d-card>
          `,
          
        });
    
        expect(wrapper.find('.devui-card-actions-align-spaceBetween').exists()).toBeTruthy();
        const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
        expect(avatar.classes()).toContain('devui-avatar');
        expect(avatar.find('.devui-avatar-style').text()).toBe('DE')
        expect(wrapper.find('.devui-card-title').text()).toBe('DEVUI Course')
        expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI')
        expect(wrapper.find('.devui-card-content').text()).toBe('DEVUI')
        expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
        expect(wrapper.find('.card-block').text()).toBe('btn')
    });
})