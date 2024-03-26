import { reactive, ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { categorySearchInjectionKey } from '../category-search-types';
import type { CategorySearchInjection } from '../category-search-types';
import { DELAY } from '../category-search-const';

export function useCategorySearchSave(createFilterFn: (val: string) => void) {
	const isVisible = ref(false);
	const formRef = ref();
	const inputRef = ref();
	const formData = reactive({
		filterName: ''
	});

	const onConfirm = () => {
		formRef.value.validate((isValid: boolean) => {
			if (isValid) {
				createFilterFn(formData.filterName);
				isVisible.value = false;
				setTimeout(() => {
					formData.filterName = '';
				}, DELAY);
			}
		});
	};
	const onToggle = (status: boolean) => {
		isVisible.value = status;
		if (status) {
			formData.filterName = '';
			setTimeout(() => {
				inputRef.value.focus();
			});
		}
	};

	return { isVisible, formRef, formData, inputRef, onConfirm, onToggle };
}

export function useCategorySearchMore() {
	const { rootRef, innerSelectedTags, joinLabelTypes } = inject(categorySearchInjectionKey) as CategorySearchInjection;
	const isVisible = ref(false);
	const iconRef = ref();
	const overlayRef = ref();

	onClickOutside(
		overlayRef,
		() => {
			isVisible.value = false;
		},
		{ ignore: [iconRef] }
	);

	return { isVisible, rootRef, iconRef, overlayRef, innerSelectedTags, joinLabelTypes };
}