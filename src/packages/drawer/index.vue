<template>
  <TPopover
    type="none"
    :position="props.position"
    :width="isSide ? props.size : '100%'"
    v-model="visible"
    :disabled="props.disabled"
    :close-on-press-escape="props.closeOnPressEscape"
    :close-on-press-other="!props.isModal && props.closeOnPressModel"
    :padding="props.padding"
    :box-shadow="props.boxShadow"
    :custom="state.custom"
    :drawer-animation="true"
    :show-arrow="false"
    :is-modal="props.isModal"
    :is-modal-nest="true"
    :radius="[0, 0, 0, 0]"
    @click-model="handlerClickModel"
    @open="emit('open')"
    @close="emit('close')"
  >
    <template #content>
      <div class="t-drawer" :style="getPopconfirmStyle">
        <div class="_head">
          <slot name="title">
            <div class="_title">
              <TIcon :icon="props.icon" :size="18" v-if="props.icon" />
              <span class="_title">{{ props.title }}</span>
            </div>
          </slot>
          <TIcon icon="close" :size="28" @click="handlerSubmit(false)" v-if="props.isCloseIcon" />
        </div>
        <div class="content">
          <slot />
        </div>
        <div class="_foot" :style="getFootStyle" v-if="props.isFoot">
          <slot name="foot">
            <div class="_btn">
              <TButton :type="props.cancelType" @click="handlerSubmit(true)">{{ props.cancelText }}</TButton>
              <TButton :type="props.confirmType" @click="handlerSubmit(false)">
                {{ props.confirmText }}
              </TButton>
            </div>
          </slot>
        </div>
      </div>
    </template>
  </TPopover>
</template>
<script lang="ts" setup>
import type { PropsType, EmitsType } from './drawer'
import { TPopover } from '../popover'
import { TButton } from '../button'
import { TIcon } from '../icon'
import { computed, reactive, StyleValue } from 'vue'
defineOptions({ name: 'TDrawer' })
const emit = defineEmits<EmitsType>()
const gap = 4
const state = reactive({
  custom: { x: 0, y: 0 }
})
const props = withDefaults(defineProps<PropsType>(), {
  position: 'left',
  size: '600px',
  icon: 'inspiration',
  confirmText: '确认',
  confirmType: 'success',
  cancelText: '取消',
  cancelType: 'default',
  btnAlign: 'flex-end',
  closeOnPressEscape: true,
  closeOnPressModel: true,
  isModal: true,
  isFoot: true,
  isCloseIcon: true,
  isSetMaxHeight: true,
  padding: () => [12, 16, 12, 16],
  offset: () => ({ x: 0, y: 0 })
})
const visible = defineModel<boolean>()
/**
 * 判断是否是两侧方向
 */
const isSide = computed(() => {
  return ['left', 'right'].includes(props.position)
})

const handlerSubmit = (isConfirm) => {
  if (isConfirm) emit('confirm')
  else emit('cancel')
  visible.value = false
}
const handlerClickModel = () => {
  if (props.closeOnPressModel) handlerSubmit(false)
}
const getPopconfirmStyle = computed((): StyleValue => {
  const { size, isSetMaxHeight } = props
  let sizeKey = 'width'
  let maxKey = 'height'
  // 高度需要计算
  let maxScreen = `${window.innerHeight - props.padding[0] * 2 - gap}px`
  // 设置上下
  if (!isSide.value) {
    sizeKey = 'height'
    maxKey = 'width'
    maxScreen = '100%'
  }
  // 设置body样式
  document.body.style.overflow = 'hidden'
  return {
    [sizeKey]: isSide.value ? '100%' : size,
    // isSetMaxScreen 控制是否占全高(只适用于 left|right)
    [maxKey]: isSetMaxHeight ? maxScreen : 'auto'
  }
})
const getFootStyle = computed((): StyleValue => {
  return {
    justifyContent: props.btnAlign
  }
})
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
