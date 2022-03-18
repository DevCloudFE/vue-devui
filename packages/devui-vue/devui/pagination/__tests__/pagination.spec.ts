import { DOMWrapper, mount } from '@vue/test-utils';
import { reactive } from 'vue';
import { Pagination } from '../index';
import { Select } from '../../select';
import { Input } from '../../input';

const globalOption = {
  global: {
    components: {
      DSelect: Select,
      DInput: Input
    }
  }
};

describe('pagination: ', () => {
  it('test pageSize', async () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          size="sm"
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          v-model:pageIndex="pager.pageIndex"
          :canViewTotal="true"
          :canChangePageSize="true"
          :canJumpPage="true"
          :maxItems="5"
          :showJumpButton="true"
        />
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 20,
          pageIndex: 5
        });
        return { pager };
      }
    }, globalOption);

    expect(wrapper.find('.devui-pagination-item.active').text()).toEqual('5');
    expect((wrapper.find('.devui-select-input').element as HTMLInputElement).value).toEqual('20');

    const btns = wrapper.findAll('a.devui-pagination-link');
    expect(btns.map((ele: DOMWrapper<Element>) => ele.text()).join()).toEqual('<,1,...,4,5,6,...,16,>');
    expect(wrapper.find('.devui-pagination-list').classes()).toContain('devui-pagination-sm');

    // 跳转按钮
    expect(wrapper.find('.devui-jump-container').exists()).toBeTruthy();
    expect(wrapper.find('.devui-jump-button').exists()).toBeTruthy();

    // 翻页
    await btns[0].trigger('click');
    expect(wrapper.find('.devui-pagination-item.active').text()).toEqual('4');
    const btns1 = wrapper.findAll('a.devui-pagination-link');
    expect(btns1.map((ele: DOMWrapper<Element>) => ele.text()).join()).toEqual('<,1,...,3,4,5,...,16,>');

    // 改变每页条数
    await wrapper.find('.devui-select-input').trigger('click');
    await wrapper.findAll('.devui-select-item')[1].trigger('click');

    expect((wrapper.find('.devui-select-input').element as HTMLInputElement).value).toEqual('10');
    const btns2 = wrapper.findAll('a.devui-pagination-link');
    expect(btns2.map((ele: DOMWrapper<Element>) => ele.text()).join()).toEqual('<,1,...,3,4,5,...,31,>');
  });

  it('test callback', async () => {
    const pageIndexChange = jest.fn();
    const pageSizeChange = jest.fn();
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          size="lg"
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          v-model:pageIndex="pager.pageIndex"
          :canViewTotal="true"
          :canChangePageSize="true"
          :canJumpPage="true"
          :maxItems="10"
          @pageIndexChange="pageIndexChange"
          @pageSizeChange="pageSizeChange"
        />
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 10,
          pageIndex: 10
        });
        return { pager, pageIndexChange, pageSizeChange };
      }
    }, globalOption);

    expect(wrapper.find('.devui-pagination-list').classes()).toContain('devui-pagination-lg');
    const btns = wrapper.findAll('a.devui-pagination-link');
    const pageIndexs = btns.map((ele: DOMWrapper<Element>) => ele.text());
    expect(pageIndexs.join()).toEqual('<,1,...,6,7,8,9,10,11,12,13,...,31,>');

    // 当前页改变回调
    await btns[0].trigger('click');
    expect(pageIndexChange).toHaveBeenCalled();

    // 每页条数改变回调
    await wrapper.find('.devui-select-input').trigger('click');
    await wrapper.findAll('.devui-select-item')[1].trigger('click');
    expect(pageSizeChange).toHaveBeenCalled();
  });

  it('test first or lastest pageIndex disabled', async () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          v-model:pageIndex="pager.pageIndex"
          :canViewTotal="true"
          :canChangePageSize="true"
          :canJumpPage="true"
          :maxItems="5"
          :showJumpButton="true"
        />
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 20,
          pageIndex: 1
        });
        return { pager };
      }
    }, globalOption);

    const btns = wrapper.findAll('.devui-pagination-item');
    expect(btns[0].classes()).toContain('disabled');

    await btns[btns.length - 2].trigger('click');
    const btns1 = wrapper.findAll('.devui-pagination-item');
    expect(btns1[btns1.length - 1].classes()).toContain('disabled');

  });

  it('test lite', () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          totalItemText="Total"
          v-model:pageIndex="pager.pageIndex"
          :canViewTotal="true"
          :canChangePageSize="true"
          :lite="true"
        />
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 10,
          pageIndex: 10
        });
        return { pager };
      }
    }, globalOption);

    expect(wrapper.find('.devui-total-size').text()).toContain('Total');
    expect(wrapper.findAll('a.devui-pagination-link').length).toBe(2);
    expect(wrapper.find('.devui-jump-container').exists()).toBeFalsy();
  });

  it('test super lite', () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          :showPageSelector="false"
          v-model:pageIndex="pager.pageIndex"
          :canChangePageSize="true"
          :lite="true"
        />
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 10,
          pageIndex: 10
        });
        return { pager };
      }
    }, globalOption);

    expect(wrapper.find('.devui-total-size').exists()).toBeFalsy();
    expect(wrapper.find('.devui-page-size').exists()).toBeFalsy();
    expect(wrapper.findAll('a.devui-pagination-link').length).toBe(2);
    expect(wrapper.find('.devui-jump-container').exists()).toBeFalsy();
  });

  it('test haveConfigMenu', async () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          :showPageSelector="false"
          v-model:pageIndex="pager.pageIndex"
          :canChangePageSize="true"
          :lite="true"
          :haveConfigMenu="true"
        >
          <div class="pagination-config-item">
            <div class="config-item-title">show field</div>
            <div class="config-item-words">setting</div>
          </div>
          <div class="pagination-config-item">
            <div class="config-item-title">display method</div>
            <div style="padding-left: 8px; margin-top: 4px">
              <i class="icon-list-view"></i>
              <i class="icon-veIcon-briefcase"></i>
            </div>
          </div>
        </d-pagination>
      `,
      setup() {
        const pager = reactive({
          total: 306,
          pageSize: 10,
          pageIndex: 10
        });
        return { pager };
      }
    }, globalOption);

    expect(wrapper.findAll('a.devui-pagination-link').length).toBe(2);
    expect(wrapper.find('.devui-pagination-config').exists()).toBeTruthy();
    expect(wrapper.find('.devui-config-container').exists()).toBeFalsy();

    await wrapper.find('.devui-pagination-config').trigger('click');
    expect(wrapper.find('.devui-config-container').exists()).toBeTruthy();
    expect(wrapper.find('.config-item-words').exists()).toBeTruthy();
    expect(wrapper.find('.choosed').text()).toBe('10');
  });

  it('test special', async () => {
    const wrapper = mount({
      components: {
        DPagination: Pagination
      },
      template: `
        <d-pagination
          :total="pager.total"
          v-model:pageSize="pager.pageSize"
          v-model:pageIndex="pager.pageIndex"
          :maxItems="5"
          :canViewTotal="true"
          :canChangePageSize="true"
          :canJumpPage="true"
          :showTruePageIndex="true"
        />
      `,
      setup() {
        const pager = reactive({
          total: 10,
          pageIndex: 3,
          pageSize: 10
        });
        return { pager };
      }
    }, globalOption);

    const btns = wrapper.findAll('.devui-pagination-item');
    expect(btns.length).toBe(5);
    expect(wrapper.findAll('.devui-pagination-item.disabled').length).toBe(3);
    expect(wrapper.find('.devui-pagination-item.active.disabled').text()).toBe('3');

    await btns[0].trigger('click');
    expect(wrapper.findAll('.devui-pagination-item').length).toBe(4);
    expect(wrapper.findAll('.devui-pagination-item.disabled').length).toBe(2);

    await wrapper.setProps({
      showTruePageIndex: false
    });

    expect(wrapper.findAll('.devui-pagination-item').length).toBe(3);
    expect(wrapper.findAll('.devui-pagination-item.disabled').length).toBe(2);
    expect(wrapper.find('.devui-pagination-item.active').text()).toBe('1');
  });
});
