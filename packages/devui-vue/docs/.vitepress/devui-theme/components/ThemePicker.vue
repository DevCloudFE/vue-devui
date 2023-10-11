<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue';

interface IThemeItem {
  label: string;
  value: string;
  image: string;
  color?: string;
  active?: boolean;
}

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: 'infinity-theme',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const themeData = ref<Array<IThemeItem>>([
      {
        label: '无限',
        value: 'infinity-theme',
        image:
          'data:image/png;base64,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',
        color: 'rgb(37, 43, 58)',
        active: true,
      },
      {
        label: '蜜糖',
        value: 'sweet-theme',
        image:
          'data:image/png;base64,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',
      },
      {
        label: '紫罗兰',
        value: 'provence-theme',
        image:
          'data:image/png;base64,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',
      },
      {
        label: '深邃夜空',
        value: 'deep-theme',
        image:
          'data:image/png;base64,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',
      },
      {
        label: '追光',
        value: 'galaxy-theme',
        image:
          'data:image/png;base64,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',
      },
    ]);

    const initActiveTheme = (theme: string) => {
      themeData.value.forEach((item: IThemeItem) => {
        item.active = false;

        if (item.value === theme) {
          item.active = true;
        }
      });
    };

    initActiveTheme(modelValue.value);

    watch(modelValue, (newVal) => {
      initActiveTheme(newVal);
    });

    const changeTheme = (theme: string) => {
      emit('update:modelValue', theme);
    };

    return {
      themeData,
      changeTheme,
    };
  },
});
</script>

<template>
  <d-dropdown :position="['bottom-end', 'top-end']" align="end">
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="theme-svg"
    >
      <title>主题</title>
      <defs>
        <path
          d="M10.9413663,3.36384679 C20.8238245,4.57500917 20.6277984,11.1210823 18.6225875,13.390256 C16.6173765,15.6594297 11.4891114,16.4362963 6.9842458,15.5915376 C2.47938015,14.7467789 -0.24407915,11.8699108 0.324702982,9.97740487 C0.695679359,8.74305704 1.66007126,8.42232183 2.88615755,8.20637055 C3.42125625,8.11212331 4.08497648,7.74188644 4.08497648,7.24845168 C4.08497648,6.75501693 2.69883622,6.75501693 2.61851413,5.65563982 C2.49496015,3.96454321 7.03910783,2.8855985 10.9413663,3.36384679 Z M7.75543448,5.10111158 C6.92700736,5.10111158 6.13043448,5.38093361 6.13043448,5.72611158 C6.13043448,6.07128955 6.92700736,6.47611158 7.75543448,6.47611158 C8.58386161,6.47611158 9.38043448,6.07128955 9.38043448,5.72611158 C9.38043448,5.38093361 8.58386161,5.10111158 7.75543448,5.10111158 Z"
          id="path-1"
        ></path>
        <filter x="-0.0%" y="-0.0%" width="100.0%" height="100.0%" filterUnits="objectBoundingBox" id="filter-2">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            values="0 0 0 0 1   0 0 0 0 0.749764051   0 0 0 0 0.467144627  0 0 0 1 0"
            type="matrix"
            in="shadowInnerInner1"
          ></feColorMatrix>
        </filter>
        <linearGradient x1="100%" y1="50%" x2="0%" y2="50%" id="linearGradient-3">
          <stop stop-color="#7B3A00" offset="0%"></stop>
          <stop stop-color="#CD6B18" offset="48.8367072%"></stop>
          <stop stop-color="#A55405" offset="100%"></stop>
        </linearGradient>
        <path
          d="M1.75,0 C2.71649831,0 3.5,0.391750844 3.5,0.875 C3.5,0.999998372 3.44757886,1.11887494 3.353129,1.22643349 C3.36756813,1.19223857 3.375,1.15834105 3.375,1.125 C3.375,0.779822031 2.57842712,0.5 1.75,0.5 C0.921572875,0.5 0.125,0.779822031 0.125,1.125 C0.125,1.15834105 0.132431869,1.19223857 0.146606461,1.226274 C0.0524211372,1.11887494 0,0.999998372 0,0.875 C0,0.391750844 0.783501688,0 1.75,0 Z"
          id="path-4"
        ></path>
        <filter x="0.0%" y="0.0%" width="100.0%" height="100.0%" filterUnits="objectBoundingBox" id="filter-5">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetInner1"></feOffset>
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          ></feComposite>
          <feColorMatrix
            values="0 0 0 0 1   0 0 0 0 0.97688858   0 0 0 0 0.909952601  0 0 0 1 0"
            type="matrix"
            in="shadowInnerInner1"
          ></feColorMatrix>
        </filter>
        <path
          d="M1.59785695,2.12958154 C2.28821289,2.12958154 2.51437535,1.51843159 2.51437535,1 C2.51437535,0.481568407 1.95473128,0 1.26437535,0 C0.57401941,0 0,0.152716333 0,0.705001082 C0,0.9746187 0.331800255,1.34157032 0.633512103,1.625 C0.949826829,1.9221477 1.24452304,2.12958154 1.59785695,2.12958154 Z"
          id="path-6"
        ></path>
        <filter x="-119.3%" y="-140.9%" width="338.6%" height="381.7%" filterUnits="objectBoundingBox" id="filter-8">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.230985337   0 0 0 0 0.205195595   0 0 0 0 0.161357431  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <filter x="-31.1%" y="-48.6%" width="162.2%" height="197.3%" filterUnits="objectBoundingBox" id="filter-9">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-51.0%" y="-60.0%" width="202.0%" height="219.9%" filterUnits="objectBoundingBox" id="filter-10">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-127.5%" y="-127.5%" width="355.0%" height="355.0%" filterUnits="objectBoundingBox" id="filter-11">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <path
          d="M1.49436089,2.39080926 C2.18471683,2.39080926 2.78730922,1.51895653 2.51437535,1 C2.24144147,0.481043474 1.95473128,0 1.26437535,0 C0.57401941,0 0,0.152716333 0,0.705001082 C0,1.25728583 0.804004958,2.39080926 1.49436089,2.39080926 Z"
          id="path-12"
        ></path>
        <filter x="-116.2%" y="-125.5%" width="332.4%" height="351.0%" filterUnits="objectBoundingBox" id="filter-14">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.230985337   0 0 0 0 0.205195595   0 0 0 0 0.161357431  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <filter x="-31.1%" y="-45.3%" width="162.2%" height="190.6%" filterUnits="objectBoundingBox" id="filter-15">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-51.0%" y="-60.0%" width="202.0%" height="219.9%" filterUnits="objectBoundingBox" id="filter-16">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-127.5%" y="-127.5%" width="355.0%" height="355.0%" filterUnits="objectBoundingBox" id="filter-17">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <path
          d="M1.41831967,2.15103332 C2.10867561,2.15103332 2.51437535,1.55228475 2.51437535,1 C2.51437535,0.44771525 1.95473128,1.13686838e-13 1.26437535,1.13686838e-13 C0.57401941,1.13686838e-13 -3.97903932e-13,0.152716333 -3.97903932e-13,0.705001082 C-3.97903932e-13,1.25728583 0.727963733,2.15103332 1.41831967,2.15103332 Z"
          id="path-18"
        ></path>
        <filter x="-119.3%" y="-139.5%" width="338.6%" height="378.9%" filterUnits="objectBoundingBox" id="filter-20">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.250494473   0 0 0 0 0.160392861   0 0 0 0 0.00723548608  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <filter x="-31.1%" y="-50.1%" width="162.2%" height="200.1%" filterUnits="objectBoundingBox" id="filter-21">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-51.0%" y="-60.0%" width="202.0%" height="219.9%" filterUnits="objectBoundingBox" id="filter-22">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-127.5%" y="-127.5%" width="355.0%" height="355.0%" filterUnits="objectBoundingBox" id="filter-23">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <path
          d="M1.49436089,2.39080926 C2.18471683,2.39080926 2.51437535,1.55228475 2.51437535,1 C2.51437535,0.44771525 1.95473128,0 1.26437535,0 C0.57401941,0 0,0.152716333 0,0.705001082 C0,0.997848689 0.135279952,1.63627944 0.520686182,1.93312491 C0.892469114,2.21947752 1.17006447,2.39080926 1.49436089,2.39080926 Z"
          id="path-24"
        ></path>
        <filter x="-119.3%" y="-125.5%" width="338.6%" height="351.0%" filterUnits="objectBoundingBox" id="filter-26">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.230985337   0 0 0 0 0.205195595   0 0 0 0 0.161357431  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <filter x="-31.1%" y="-45.3%" width="162.2%" height="190.6%" filterUnits="objectBoundingBox" id="filter-27">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-51.0%" y="-60.0%" width="202.0%" height="219.9%" filterUnits="objectBoundingBox" id="filter-28">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-127.5%" y="-127.5%" width="355.0%" height="355.0%" filterUnits="objectBoundingBox" id="filter-29">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <path
          d="M1.43229521,2.39081264 C2.3736473,2.27355313 2.45230967,1.55228813 2.45230967,1 C2.45230967,0.447718626 1.8926656,0 1.20230967,0 C0.51195373,0 0.0931278074,0.31573988 0.00834457692,0.931086256 C-0.0764386535,1.54643263 0.490943123,2.50807214 1.43229521,2.39081264 Z"
          id="path-30"
        ></path>
        <filter x="-122.3%" y="-125.0%" width="344.7%" height="349.9%" filterUnits="objectBoundingBox" id="filter-32">
          <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feColorMatrix
            values="0 0 0 0 0.230985337   0 0 0 0 0.205195595   0 0 0 0 0.161357431  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
        <filter x="-31.1%" y="-45.3%" width="162.2%" height="190.6%" filterUnits="objectBoundingBox" id="filter-33">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-51.0%" y="-60.0%" width="202.0%" height="219.9%" filterUnits="objectBoundingBox" id="filter-34">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
        <filter x="-127.5%" y="-127.5%" width="355.0%" height="355.0%" filterUnits="objectBoundingBox" id="filter-35">
          <feGaussianBlur stdDeviation="0.31875" in="SourceGraphic"></feGaussianBlur>
        </filter>
      </defs>
      <g id="主题" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M10.9413663,3.98884679 C20.8238245,5.20000917 20.6277984,11.7460823 18.6225875,14.015256 C16.6173765,16.2844297 11.4891114,17.0612963 6.9842458,16.2165376 C2.47938015,15.3717789 -0.24407915,12.4949108 0.324702982,10.6024049 C0.695679359,9.36805704 1.66007126,9.04732183 2.88615755,8.83137055 C3.42125625,8.73712331 4.08497648,8.36688644 4.08497648,7.87345168 C4.08497648,7.38001693 2.69883622,7.38001693 2.61851413,6.28063982 C2.49496015,4.58954321 7.03910783,3.5105985 10.9413663,3.98884679 Z M7.75543448,5.10111158 C6.92700736,5.10111158 6.13043448,5.38093361 6.13043448,5.72611158 C6.13043448,6.07128955 6.92700736,6.47611158 7.75543448,6.47611158 C8.58386161,6.47611158 9.38043448,6.07128955 9.38043448,5.72611158 C9.38043448,5.38093361 8.58386161,5.10111158 7.75543448,5.10111158 Z"
          id="蒙版"
          fill="#B57835"
        ></path>
        <g id="蒙版">
          <use fill="#F7AF53" fill-rule="evenodd" xlink:href="#path-1"></use>
          <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlink:href="#path-1"></use>
        </g>
        <g id="形状结合" transform="translate(6.005434, 4.601112)">
          <use fill="url(#linearGradient-3)" fill-rule="evenodd" xlink:href="#path-4"></use>
          <use fill="black" fill-opacity="1" filter="url(#filter-5)" xlink:href="#path-4"></use>
        </g>
        <g id="编组-33" transform="translate(11.741059, 4.726112)">
          <g id="路径-50">
            <mask id="mask-7" fill="white">
              <use xlink:href="#path-6"></use>
            </mask>
            <g id="蒙版">
              <use fill="black" fill-opacity="1" filter="url(#filter-8)" xlink:href="#path-6"></use>
              <use fill="#75EA03" fill-rule="evenodd" xlink:href="#path-6"></use>
            </g>
            <path
              d="M2.50071637,0.466642952 C2.66964543,0.717712513 2.72169167,0.985630459 2.64526978,1.24592029 L2.59818018,1.37067865 L2.58386679,1.40373209 L2.52515978,1.58970744 C2.42866346,1.89542077 2.2732955,2.0625 1.94400906,2.0625 C1.83005477,2.0625 1.73809573,2.07179838 1.66939762,2.08815565 L1.60850003,2.10678294 L1.38022176,1.52496336 C1.49506441,1.47990457 1.62892266,1.45323583 1.78306221,1.44271763 L1.922,1.438 L1.92914558,1.40157964 L2.01291541,1.14486825 L2.03255853,1.10519566 C2.06380007,1.03420139 2.06298737,0.966004349 2.02126617,0.88189792 L1.98216657,0.815542798 L2.50071637,0.466642952 Z"
              id="路径-51"
              fill="#FFFFFF"
              fill-rule="nonzero"
              opacity="0.600000024"
              mask="url(#mask-7)"
            ></path>
            <path
              d="M-1.90403249e-14,1.01843159 C0.299128532,1.33399159 0.56816928,1.56166663 0.807122243,1.70145671 C1.16555169,1.91114183 1.67742904,2.0264833 1.96932986,1.90700339 C2.16393041,1.82735012 2.40522711,1.57282618 2.69321998,1.14343159 L2.85757085,2.2474362 L1.88059251,2.9849397 C0.752368921,2.71463849 0.188257127,2.56506419 0.188257127,2.5362168 C0.188257127,2.4929457 -0.218137259,1.53771046 -0.218137259,1.46100925 C-0.218137259,1.40987511 -0.14542484,1.26234922 -1.90403249e-14,1.01843159 Z"
              fill="#1D5E00"
              filter="url(#filter-9)"
              mask="url(#mask-7)"
            ></path>
          </g>
          <path
            d="M1.49436089,1.81587315 C1.90857446,1.81587315 2.24144147,1.60824916 2.24144147,1.125 C2.24144147,0.641750844 1.71816493,0.220990038 1.30395137,0.220990038 C0.889737804,0.220990038 0.366461262,0.356287427 0.366461262,0.839536583 C0.366461262,1.32278574 1.08014733,1.81587315 1.49436089,1.81587315 Z"
            id="椭圆形"
            fill="#3D9F09"
            opacity="0.690769741"
            filter="url(#filter-10)"
          ></path>
          <path
            d="M1.29902157,1.51843159 C1.46470874,1.51843159 1.59785695,1.4207956 1.59785695,1.1935458 C1.59785695,0.966296002 1.38854412,0.768431593 1.22285695,0.768431593 C1.05716978,0.768431593 0.847856951,0.832055717 0.847856951,1.05930552 C0.847856951,1.28655532 1.13333439,1.51843159 1.29902157,1.51843159 Z"
            id="椭圆形备份-53"
            fill="#45C300"
            filter="url(#filter-11)"
          ></path>
        </g>
        <g id="编组-33备份" transform="translate(15.491059, 7.726112)">
          <g id="路径-50">
            <mask id="mask-13" fill="white">
              <use xlink:href="#path-12"></use>
            </mask>
            <g id="蒙版">
              <use fill="black" fill-opacity="1" filter="url(#filter-14)" xlink:href="#path-12"></use>
              <use fill="#02B8F5" fill-rule="evenodd" xlink:href="#path-12"></use>
            </g>
            <path
              d="M2.50071637,0.716642952 C2.66964543,0.967712513 2.72169167,1.23563046 2.64526978,1.49592029 L2.59818018,1.62067865 L2.58386679,1.65373209 L2.52515978,1.83970744 C2.42866346,2.14542077 2.2732955,2.3125 1.94400906,2.3125 C1.83005477,2.3125 1.73809573,2.32179838 1.66939762,2.33815565 L1.60850003,2.35678294 L1.38022176,1.77496336 C1.49506441,1.72990457 1.62892266,1.70323583 1.78306221,1.69271763 L1.922,1.688 L1.92914558,1.65157964 L2.01291541,1.39486825 L2.03255853,1.35519566 C2.06380007,1.28420139 2.06298737,1.21600435 2.02126617,1.13189792 L1.98216657,1.0655428 L2.50071637,0.716642952 Z"
              id="路径-51"
              fill="#FFFFFF"
              fill-rule="nonzero"
              opacity="0.600000024"
              mask="url(#mask-13)"
            ></path>
            <path
              d="M-4.6629367e-15,0.93108288 C0.252403273,1.38115298 0.498081391,1.67608307 0.737034354,1.81587315 C1.0954638,2.02555827 1.71123729,2.06904751 1.97633938,1.99277541 C2.15307411,1.94192734 2.38128656,1.70611836 2.66097673,1.28534846 L2.82285925,2.30485855 L1.84588091,3.04236204 C0.717657324,2.77206084 0.15354553,2.62248654 0.15354553,2.59363914 C0.15354553,2.55036805 -0.252848856,1.5951328 -0.252848856,1.51843159 C-0.252848856,1.46729745 -0.168565904,1.27151455 -4.6629367e-15,0.93108288 Z"
              fill="#004185"
              filter="url(#filter-15)"
              mask="url(#mask-13)"
            ></path>
          </g>
          <path
            d="M1.49436089,1.81587315 C1.90857446,1.81587315 2.24144147,1.60824916 2.24144147,1.125 C2.24144147,0.641750844 1.71816493,0.220990038 1.30395137,0.220990038 C0.889737804,0.220990038 0.366461262,0.356287427 0.366461262,0.839536583 C0.366461262,1.32278574 1.08014733,1.81587315 1.49436089,1.81587315 Z"
            id="椭圆形"
            fill="#0381B9"
            opacity="0.698917934"
            filter="url(#filter-16)"
          ></path>
          <path
            d="M1.29902157,1.51843159 C1.46470874,1.51843159 1.59785695,1.4207956 1.59785695,1.1935458 C1.59785695,0.966296002 1.38854412,0.768431593 1.22285695,0.768431593 C1.05716978,0.768431593 0.847856951,0.832055717 0.847856951,1.05930552 C0.847856951,1.28655532 1.13333439,1.51843159 1.29902157,1.51843159 Z"
            id="椭圆形备份-53"
            fill="#019CCF"
            filter="url(#filter-17)"
          ></path>
        </g>
        <g
          id="编组-33备份-2"
          transform="translate(15.461199, 12.785536) scale(1, -1) rotate(-162.000000) translate(-15.461199, -12.785536) translate(14.204012, 11.710020)"
        >
          <g id="路径-50" transform="translate(-0.000000, 0.000000)">
            <mask id="mask-19" fill="white">
              <use xlink:href="#path-18"></use>
            </mask>
            <g id="蒙版">
              <use fill="black" fill-opacity="1" filter="url(#filter-20)" xlink:href="#path-18"></use>
              <use fill="#FFE300" fill-rule="evenodd" xlink:href="#path-18"></use>
            </g>
            <path
              d="M1.48275947,0.546071584 C1.65168853,0.797141144 1.70373476,1.06505909 1.62731288,1.32534892 L1.56710729,1.482002 L1.48425053,1.67455987 C1.42721898,1.79689124 1.36522021,1.88525798 1.26831161,1.96939199 C1.21730374,2.01367595 1.15832531,2.05488439 1.08577464,2.09802681 C0.878173269,2.2214774 0.665485871,2.26592698 0.461897028,2.21762617 L0.360926489,2.1856829 L0.591881489,1.60492066 C0.629117969,1.6197287 0.679759165,1.6123098 0.766329673,1.56083046 L0.835268664,1.51594602 C0.844177849,1.50938322 0.851896117,1.50323611 0.858572572,1.49743975 C0.874828774,1.48332646 0.885749256,1.47078039 0.897875234,1.44971632 L0.93570589,1.36954018 L1.01460163,1.18462429 C1.04584316,1.11363002 1.04503046,1.04543298 1.00330926,0.961326552 L0.964209664,0.894971429 L1.48275947,0.546071584 Z"
              id="路径-51"
              fill="#FFFFFF"
              fill-rule="nonzero"
              opacity="0.600000024"
              mask="url(#mask-19)"
              transform="translate(1.011323, 1.391406) rotate(96.000000) translate(-1.011323, -1.391406) "
            ></path>
            <path
              d="M-0.178233507,1.18606183 C0.192992104,1.46614596 0.498081391,1.67608307 0.737034354,1.81587315 C1.0954638,2.02555827 1.69357348,1.99975573 1.95192534,1.85814205 C2.12415992,1.76373293 2.35505066,1.5218556 2.64459758,1.13251005 L2.82285925,2.30485855 L1.84588091,3.04236204 C0.717657324,2.77206084 0.15354553,2.62248654 0.15354553,2.59363914 C0.15354553,2.55036805 -0.252848856,1.5951328 -0.252848856,1.51843159 C-0.252848856,1.46729745 -0.227977073,1.35650753 -0.178233507,1.18606183 Z"
              fill="#B27100"
              filter="url(#filter-21)"
              mask="url(#mask-19)"
            ></path>
          </g>
          <path
            d="M1.49436089,1.81587315 C1.90857446,1.81587315 2.24144147,1.60824916 2.24144147,1.125 C2.24144147,0.641750844 1.71816493,0.220990038 1.30395137,0.220990038 C0.889737804,0.220990038 0.366461262,0.356287427 0.366461262,0.839536583 C0.366461262,1.32278574 1.08014733,1.81587315 1.49436089,1.81587315 Z"
            id="椭圆形"
            fill="#D5B807"
            opacity="0.794401623"
            filter="url(#filter-22)"
          ></path>
          <path
            d="M1.29902157,1.51843159 C1.46470874,1.51843159 1.59785695,1.4207956 1.59785695,1.1935458 C1.59785695,0.966296002 1.38854412,0.768431593 1.22285695,0.768431593 C1.05716978,0.768431593 0.847856951,0.832055717 0.847856951,1.05930552 C0.847856951,1.28655532 1.13333439,1.51843159 1.29902157,1.51843159 Z"
            id="椭圆形备份-53"
            fill="#FEDF01"
            filter="url(#filter-23)"
          ></path>
        </g>
        <g
          id="编组-33备份-3"
          transform="translate(9.998247, 13.421516) scale(-1, 1) translate(-9.998247, -13.421516) translate(8.741059, 12.226112)"
        >
          <g id="路径-50">
            <mask id="mask-25" fill="white">
              <use xlink:href="#path-24"></use>
            </mask>
            <g id="蒙版">
              <use fill="black" fill-opacity="1" filter="url(#filter-26)" xlink:href="#path-24"></use>
              <use fill="#FF3801" fill-rule="evenodd" xlink:href="#path-24"></use>
            </g>
            <path
              d="M1.36719163,0.280254542 C1.56025342,0.567191182 1.60065192,0.876133878 1.47109363,1.17054628 L1.38600496,1.38389661 C1.35440537,1.46085368 1.32165724,1.5204894 1.27303755,1.58091314 C1.20643545,1.66368512 1.12082246,1.73356394 0.982163841,1.82472917 C0.715980426,1.99973937 0.457214739,2.05276109 0.239582946,1.92526201 L0.159965027,1.86887363 L0.561707283,1.39009585 C0.544922267,1.37601155 0.54169924,1.3698664 0.562407502,1.35365898 L0.696923051,1.26310118 L0.768386811,1.20754665 C0.776050623,1.20048814 0.781833674,1.19440303 0.786099931,1.189101 L0.808586647,1.14423665 L0.899033792,0.918807245 C0.930275328,0.847812979 0.92946263,0.779615938 0.887741426,0.69550951 L0.84864183,0.629154387 L1.36719163,0.280254542 Z"
              id="路径-51"
              fill="#FFFFFF"
              fill-rule="nonzero"
              opacity="0.600000024"
              mask="url(#mask-25)"
              transform="translate(0.853059, 1.137942) rotate(129.000000) translate(-0.853059, -1.137942) "
            ></path>
            <path
              d="M5.24580379e-14,0.93108288 C0.252403273,1.38115298 0.498081391,1.67608307 0.737034354,1.81587315 C1.0954638,2.02555827 1.71123729,2.06904751 1.97633938,1.99277541 C2.15307411,1.94192734 2.38128656,1.70611836 2.66097673,1.28534846 L2.82285925,2.30485855 L1.84588091,3.04236204 C0.717657324,2.77206084 0.15354553,2.62248654 0.15354553,2.59363914 C0.15354553,2.55036805 -0.252848856,1.5951328 -0.252848856,1.51843159 C-0.252848856,1.46729745 -0.168565904,1.27151455 5.24580379e-14,0.93108288 Z"
              fill="#AF1B04"
              filter="url(#filter-27)"
              mask="url(#mask-25)"
            ></path>
          </g>
          <path
            d="M1.49436089,1.81587315 C1.90857446,1.81587315 2.24144147,1.60824916 2.24144147,1.125 C2.24144147,0.641750844 1.71816493,0.220990038 1.30395137,0.220990038 C0.889737804,0.220990038 0.366461262,0.356287427 0.366461262,0.839536583 C0.366461262,1.32278574 1.08014733,1.81587315 1.49436089,1.81587315 Z"
            id="椭圆形"
            fill="#C12B01"
            filter="url(#filter-28)"
          ></path>
          <path
            d="M1.29902157,1.51843159 C1.46470874,1.51843159 1.59785695,1.4207956 1.59785695,1.1935458 C1.59785695,0.966296002 1.38854412,0.768431593 1.22285695,0.768431593 C1.05716978,0.768431593 0.847856951,0.832055717 0.847856951,1.05930552 C0.847856951,1.28655532 1.13333439,1.51843159 1.29902157,1.51843159 Z"
            id="椭圆形备份-53"
            fill="#FF5F00"
            opacity="0.876560756"
            filter="url(#filter-29)"
          ></path>
        </g>
        <g id="编组-33备份-4" transform="translate(3.553125, 10.226108)">
          <g id="路径-50">
            <mask id="mask-31" fill="white">
              <use xlink:href="#path-30"></use>
            </mask>
            <g id="蒙版">
              <use fill="black" fill-opacity="1" filter="url(#filter-32)" xlink:href="#path-30"></use>
              <use fill="#D35AF6" fill-rule="evenodd" xlink:href="#path-30"></use>
            </g>
            <path
              d="M-0.0620656807,0.931086256 C0.190337593,1.38115635 0.436015711,1.67608644 0.674968674,1.81587652 C1.03339812,2.02556164 1.64917161,2.06905088 1.9142737,1.99277878 C2.09100843,1.94193071 2.31922088,1.70612173 2.59891105,1.28535184 L2.76079357,2.30486192 L1.78381523,3.04236542 C0.655591643,2.77206421 0.0914798496,2.62248991 0.0914798496,2.59364252 C0.0914798496,2.55037142 -0.314914537,1.59513618 -0.314914537,1.51843497 C-0.314914537,1.46730083 -0.230631585,1.27151792 -0.0620656807,0.931086256 Z"
              fill="#55007C"
              filter="url(#filter-33)"
              mask="url(#mask-31)"
            ></path>
          </g>
          <path
            d="M1.43229521,1.81587652 C1.84650878,1.81587652 2.17937579,1.60825253 2.17937579,1.12500338 C2.17937579,0.641754219 1.65609925,0.220993413 1.24188569,0.220993413 C0.827672124,0.220993413 0.304395582,0.356290802 0.304395582,0.839539958 C0.304395582,1.32278911 1.01808165,1.81587652 1.43229521,1.81587652 Z"
            id="椭圆形"
            fill="#6F088A"
            opacity="0.481496175"
            filter="url(#filter-34)"
          ></path>
          <path
            d="M1.23695589,1.51843497 C1.40264306,1.51843497 1.53579127,1.42079898 1.53579127,1.19354918 C1.53579127,0.966299378 1.32647844,0.768434968 1.16079127,0.768434968 C0.995104096,0.768434968 0.78579127,0.832059093 0.78579127,1.05930889 C0.78579127,1.28655869 1.07126871,1.51843497 1.23695589,1.51843497 Z"
            id="椭圆形备份-53"
            fill="#B443D4"
            opacity="0.619521368"
            filter="url(#filter-35)"
          ></path>
        </g>
      </g>
    </svg>
    <template #menu>
      <div class="theme-picker__dropdown-menu">
        <div
          v-for="themeItem of themeData"
          :key="themeItem.value"
          class="extend-theme-image"
          :style="{
            backgroundImage: `url(${themeItem.image})`,
          }"
          @click="changeTheme(themeItem.value)"
        >
          <span class="extend-theme-title" :style="{ color: themeItem.color }">{{ themeItem.label }}</span
          ><i v-if="themeItem.active" class="icon-right active-theme"></i>
        </div>
      </div>
    </template>
  </d-dropdown>
</template>

<style scoped lang="scss">
@import '@devui/styles-var/devui-var';

.theme-picker__dropdown-menu {
  width: 176px;
  margin: 12px 16px;
}

.extend-theme-image {
  background-repeat: no-repeat;
  height: 40px;
  margin-bottom: 8px;
  border-radius: $devui-border-radius;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  .extend-theme-title {
    margin: 0 8px;
    color: $devui-light-text;
  }

  .active-theme {
    color: $devui-light-text;
    margin-right: 8px;
    background-color: $devui-brand;
    border-radius: 50%;
    opacity: 0.6;
    padding: 4px;
  }
}

.icon-theme:hover {
  path {
    fill: $devui-brand;
  }
}

.theme-svg {
  margin-top: 6px;
}
</style>
