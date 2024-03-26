import { ref } from 'vue';
import type { SetupContext } from 'vue';

export function useCategorySearchInput(ctx: SetupContext) {
	const inputRef = ref<HTMLElement>();
	const isVisible = ref(false);

	const onInputClick = () => {
		isVisible.value = !isVisible.value;
	};

	const onDropdownClose = () => {
		isVisible.value = false;
	};

	const focus = () => {
		inputRef.value?.focus();
	};
	const scrollIntoView = () => {
		inputRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
	};
	const openMenu = () => {
		isVisible.value = true;
	};
	const closeMenu = () => {
		isVisible.value = false;
	};

	ctx.expose({ focus, scrollIntoView, openMenu, closeMenu });

	return { isVisible, inputRef, onInputClick, onDropdownClose, closeMenu };
}