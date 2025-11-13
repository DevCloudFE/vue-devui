import { defineComponent, toRefs, inject } from 'vue';
import { Dropdown } from '../../../dropdown';
import { SaveIcon } from './category-search-icons';
import { extendIconProps, categorySearchInjectionKey } from '../category-search-types';
import type { CategorySearchInjection, ExtendIconProps } from '../category-search-types';
import { useCategorySearchSave } from '../composables/use-category-search-icons';

export default defineComponent({
	name: 'DCategorySearchSave',
	props: extendIconProps,
	setup(props: ExtendIconProps) {
		const { disabled } = toRefs(props);
		const { innerTextConfig, filterNameRules, appendToBody, createFilterFn } = inject(categorySearchInjectionKey) as CategorySearchInjection;
		const { isVisible, formRef, formData, inputRef, onConfirm, onToggle } = useCategorySearchSave(createFilterFn);

		return () => (
			<div class={['dp-category-search-icon', { disabled: disabled.value }]}>
				<Dropdown
					visible={isVisible.value}
					trigger='manually'
					align='start'
					position={['bottom-start', 'top-start', 'bottom-end', 'top-end']}
					close-scope='blank'
					class='dp-save-panel'
					append-to-body={appendToBody.value}
					onToggle={onToggle}>
					{{
						default: () => <SaveIcon textConfig={innerTextConfig.value} onClick={() => (isVisible.value = !isVisible.value)} />,
						menu: () => (
							<>
								<div class='dp-save-panel-title'>
									<span>{innerTextConfig.value.createFilter}</span>
								</div>
								<div class='dp-save-filter-name'>
									<d-form ref={formRef} data={formData} layout='vertical' pop-position={['right']}>
										<d-form-item field="filterName" label={innerTextConfig.value.filterTitle} rules={filterNameRules?.value}>
											<d-input ref={inputRef} v-model={formData.filterName} placeholder='请输入...' clearable />
										</d-form-item>
									</d-form>
								</div>
								<div class='dp-save-panel-operation-area'>
									<d-button variant='solid' onClick={onConfirm}>
										确定
									</d-button>
									<d-button variant='solid' color='secondary' onClick={() => (isVisible.value = false)}>
										取消
									</d-button>
								</div>
							</>
						),
					}}
				</Dropdown>
			</div>
		);
	},
});