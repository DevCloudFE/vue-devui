<template>
  <ClientOnly>
    <div class="example">
      <div class="example-showcase">
        <slot></slot>
      </div>
      <div class="op-btns">
        <i class="op-btn" @click="copyCode">
          <span data-tooltip="复制代码"><icon-copy></icon-copy></span>
        </i>
        <i class="op-btn" @click="toggle">
          <span data-tooltip="查看代码"><icon-code></icon-code></span>
        </i>
      </div>

      <div class="demo-block-source" :style="{ height: expand ? height + 'px' : 0 }">
        <div ref="sourceRef">
          <SourceCode :source="source" />
        </div>
      </div>

      <Transition name="el-fade-in-linear">
        <div v-show="expand" class="example-float-control" @click="expand = false">
          <i>
            <icon-top></icon-top>
          </i>
          <span>隐藏源码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useCopy } from './useCopy';
import IconCopy from './icon-copy.vue';
import IconCode from './icon-code.vue';
import IconTop from './icon-top.vue';
import SourceCode from './vp-source-code.vue';
import { Message } from '../../../../devui/message';

const props = defineProps<{
  source: string;
  rawSource: string;
}>();

const expand = ref(false);
const sourceRef = ref<HTMLDivElement>();
const height = ref<number>(0);

const copyCode = async () => {
  const { copy } = useCopy(decodeURIComponent(props.rawSource), () => {
    Message.success('复制成功');
  });
  copy();
};

const toggle = () => {
  expand.value = !expand.value;
  nextTick(() => {
    height.value = sourceRef.value?.offsetHeight as number;
  });
};
</script>

<style lang="scss">
.m-0 {
  margin: 0;
}
svg {
  width: 16px;
  height: 16px;
  fill: rgba(60, 60, 60, 0.7);
}
.dark svg {
  fill: #fff;
}
.example-showcase {
  padding: 1.5rem;
  margin: 0.5px;
}
.example {
  border: 1px solid #eee;
  border-radius: 4px;

  .op-btns {
    border-top: 1px solid #eee;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--vp-c-brand);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--vp-c-text-2);
      transition: 0.2s;
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--vp-c-divider-light);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--vp-c-bg, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--vp-c-brand-light);
    }
  }
}
.demo-block-source {
  height: 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}
[data-tooltip] {
  position: relative;
}
[data-tooltip]:hover::after {
  padding: 2px;
  border-radius: 5px;
  background-color: #000;
  color: white;
  content: attr(data-tooltip);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  width: 70px;
  line-height: 26px;
  transform: translateX(-36%);
  font-size: 12px;
  text-align: center;
}
.dark [data-tooltip]:hover::after {
  background: #fff;
  color: #000;
}
</style>
