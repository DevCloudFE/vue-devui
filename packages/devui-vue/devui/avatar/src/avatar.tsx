import { defineComponent, watch, toRefs, ref, computed } from 'vue';
import AvatarBodyIcon from './components/avatar-body-icon';
import AvatarNoBodyIcon from './components/avatar-nobody-icon';
import { AvatarProps, avatarProps } from './avatar-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './avatar.scss';

export default defineComponent({
  name: 'DAvatar',
  props: avatarProps,
  setup(props: AvatarProps) {
    const { name, width, height, customText, gender, imgSrc, isRound } = toRefs(props);
    const isNobody = ref<boolean>(true);
    const isErrorImg = ref<boolean>(false);
    const fontSize = ref<number>(12);
    const code = ref<number>(1);
    const nameDisplay = ref<string>();

    const ns = useNamespace('avatar');
    const styleNS = ns.e('style');
    const bgNS = computed(() => {
      return ns.m(`${'background-' + code.value}`);
    });

    const getBackgroundColor = (char: string): void => {
      if (gender.value) {
        if (gender.value.toLowerCase() === 'male') {
          code.value = 1;
        } else if (gender.value.toLowerCase() === 'female') {
          code.value = 0;
        } else {
          console.warn('gender must be "Male" or "Female"');
        }
        return;
      }
      const unicode = char.charCodeAt(0);
      code.value = unicode % 2;
    };

    const setDisplayName = (nameValue: string, widthValue: number): void => {
      if (customText.value) {
        nameDisplay.value = customText.value;
        getBackgroundColor(customText.value.substr(0, 1));
        return;
      }
      if (nameValue.length < 2) {
        nameDisplay.value = nameValue;
      } else {
        // 以中文开头显示最后两个字符
        if (/^[\u4e00-\u9fa5]/.test(nameValue)) {
          nameDisplay.value = nameValue.substr(nameValue.length - 2, 2);
          // 英文开头
        } else if (/^[A-Za-z]/.test(nameValue)) {
          // 含有两个及以上，包含空格，下划线，中划线分隔符的英文名取前两个字母的首字母
          if (/[_ -]/.test(nameValue)) {
            const str_before = nameValue.split(/_|-|\s+/)[0];
            const str_after = nameValue.split(/_|-|\s+/)[1];
            nameDisplay.value = str_before.substr(0, 1).toUpperCase() + str_after.substr(0, 1).toUpperCase();
          } else {
            // 一个英文名的情况显示前两个字母
            nameDisplay.value = nameValue.substr(0, 2).toUpperCase();
          }
        } else {
          // 非中英文开头默认取前两个字符
          nameDisplay.value = nameValue.substr(0, 2);
        }
      }
      if (widthValue < 30) {
        nameDisplay.value = nameValue.substr(0, 1).toUpperCase();
      }
      getBackgroundColor(nameValue.substr(0, 1));
    };

    const showErrorAvatar = (): void => {
      isErrorImg.value = true;
    };

    const calcValues = (nameInput: string): void => {
      const userName = nameInput;
      const minNum = Math.min(width.value, height.value);
      if (userName) {
        isNobody.value = false;
        setDisplayName(userName, minNum);
      } else if (userName === '') {
        isNobody.value = false;
        nameDisplay.value = '';
      } else {
        isNobody.value = true;
      }
      fontSize.value = minNum / 4 + 3;
    };

    calcValues(customText.value ? customText.value : name.value);

    watch([name, width, height, customText, gender], () => {
      calcValues(customText.value ? customText.value : name.value);
    });

    return () => {
      const imgElement = (
        <img
          src={imgSrc.value}
          alt=""
          onError={showErrorAvatar}
          style={{
            height: `${height.value}px`,
            width: `${width.value}px`,
            borderRadius: isRound.value ? '100%' : '0',
          }}
        />
      );
      const hasImgSrc = imgSrc.value && !isErrorImg.value ? imgElement : null;

      const nameElement = (
        <span
          class={[styleNS, bgNS.value]}
          style={{
            height: `${height.value}px`,
            width: `${width.value}px`,
            lineHeight: `${height.value}px`,
            fontSize: `${fontSize.value}px`,
            borderRadius: isRound.value ? '100%' : '0',
          }}>
          {nameDisplay.value}
        </span>
      );
      const hasNameDisplay = !imgSrc.value && !isNobody.value && nameDisplay.value?.length !== 0 ? nameElement : null;

      const noNameElement = (
        <span class={styleNS} style={{ borderRadius: isRound.value ? '100%' : '0' }}>
          <AvatarBodyIcon width={width.value} height={height.value} />
        </span>
      );
      const hasNoDisplayName = !imgSrc.value && !isNobody.value && nameDisplay.value?.length === 0 ? noNameElement : null;

      const noBodyElement = (
        <span
          class={styleNS}
          style={{
            borderRadius: isRound.value ? '100%' : '0',
          }}>
          <AvatarNoBodyIcon width={width.value} height={height.value} />
        </span>
      );
      const noBody = (!imgSrc.value && isNobody.value) || isErrorImg.value ? noBodyElement : null;
      return (
        <span class={ns.b()}>
          {hasImgSrc}
          {hasNameDisplay}
          {hasNoDisplayName}
          {noBody}
        </span>
      );
    };
  },
});
