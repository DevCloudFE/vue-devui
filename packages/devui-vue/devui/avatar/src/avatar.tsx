import { defineComponent, watch, toRefs, ref } from 'vue';

import AvatarBodyIcon from './avatar-body-icon';
import AvatarNoBodyIcon from './avatar-nobody-icon';

import './avatar.scss';

export default defineComponent({
  name: 'DAvatar',
  props: {
    name: {
      type: String,
      default: null,
    },
    gender: {
      type: String as () => 'male' | 'female' | string,
      default: null,
    },
    width: {
      type: Number,
      default: 36,
    },
    height: {
      type: Number,
      default: 36,
    },
    isRound: {
      type: Boolean,
      default: true,
    },
    imgSrc: {
      type: String,
      default: '',
    },
    customText: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const { name, width, height, customText, gender, imgSrc, isRound } =
      toRefs(props);
    const isNobody = ref<boolean>(true);
    const isErrorImg = ref<boolean>(false);
    const fontSize = ref<number>(12);
    const code = ref<number>();
    const nameDisplay = ref<string>();

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

    const setDisplayName = (name: string, width: number): void => {
      if (customText.value) {
        nameDisplay.value = customText.value;
        getBackgroundColor(customText.value.substr(0, 1));
        return;
      }
      if (name.length < 2) {
        nameDisplay.value = name;
      } else {
        // 以中文开头显示最后两个字符
        if (/^[\u4e00-\u9fa5]/.test(name)) {
          nameDisplay.value = name.substr(name.length - 2, 2);
          // 英文开头
        } else if (/^[A-Za-z]/.test(name)) {
          // 含有两个及以上，包含空格，下划线，中划线分隔符的英文名取前两个字母的首字母
          if (/[_ -]/.test(name)) {
            const str_before = name.split(/_|-|\s+/)[0];
            const str_after = name.split(/_|-|\s+/)[1];
            nameDisplay.value =
              str_before.substr(0, 1).toUpperCase() +
              str_after.substr(0, 1).toUpperCase();
          } else {
            // 一个英文名的情况显示前两个字母
            nameDisplay.value = name.substr(0, 2).toUpperCase();
          }
        } else {
          // 非中英文开头默认取前两个字符
          nameDisplay.value = name.substr(0, 2);
        }
      }
      if (width < 30) {
        nameDisplay.value = name.substr(0, 1).toUpperCase();
      }
      getBackgroundColor(name.substr(0, 1));
    };

    const getBackgroundColor = (char: string): void => {
      if (gender.value) {
        if (gender.value.toLowerCase() === 'male') {
          code.value = 1;
        } else if (gender.value.toLowerCase() === 'female') {
          code.value = 0;
        } else {
          throw new Error('gender must be "Male" or "Female"');
        }
        return;
      }
      const unicode = char.charCodeAt(0);
      code.value = unicode % 2;
    };
    const showErrorAvatar = (): void => {
      isErrorImg.value = true;
    };

    calcValues(customText.value ? customText.value : name.value);

    watch([name, width, height, customText, gender], () => {
      calcValues(customText.value ? customText.value : name.value);
    });
    return {
      showErrorAvatar,
      isErrorImg,
      code,
      fontSize,
      nameDisplay,
      isNobody,
    };
  },
  render() {
    const {
      imgSrc,
      showErrorAvatar,
      height,
      width,
      isRound,
      isErrorImg,
      code,
      fontSize,
      nameDisplay,
      isNobody,
    } = this;
    const imgElement = (
      <img
        src={imgSrc}
        alt=""
        onError={showErrorAvatar}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          borderRadius: isRound ? '100%' : '0',
        }}
      />
    );
    const hasImgSrc = imgSrc && !isErrorImg ? imgElement : null;

    const nameElement = (
      <span
        class={`devui-avatar-style devui-avatar-background-${code}`}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          lineHeight: `${height}px`,
          fontSize: `${fontSize}px`,
          borderRadius: isRound ? '100%' : '0',
        }}
      >
        {nameDisplay}
      </span>
    );
    const hasNameDisplay =
      !imgSrc && !isNobody && nameDisplay?.length !== 0 ? nameElement : null;

    const noNameElement = (
      <span
        class={`devui-avatar-style`}
        style={{ borderRadius: isRound ? '100%' : '0' }}
      >
        <AvatarBodyIcon width={width} height={height} />
      </span>
    );
    const hasNoDisplayName =
      !imgSrc && !isNobody && nameDisplay?.length === 0 ? noNameElement : null;

    const noBodyElement = (
      <span
        class={`devui-avatar-style`}
        style={{
          borderRadius: isRound ? '100%' : '0',
        }}
      >
        <AvatarNoBodyIcon width={width} height={height} />
      </span>
    );
    const noBody = (!imgSrc && isNobody) || isErrorImg ? noBodyElement : null;
    return (
      <span class="devui-avatar">
        {hasImgSrc}
        {hasNameDisplay}
        {hasNoDisplayName}
        {noBody}
      </span>
    );
  },
});
