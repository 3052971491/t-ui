import { ref } from 'vue'
import { OptionsResultType, OptionsThemeType, OptionsType } from './type'

export function initOptions(): OptionsType {
  return {
    theme: {
      primary: '#1890ff',
      success: '#52c41a',
      warning: '#faad14',
      danger: '#f5222d',
      info: '#108ee9',
      dark: '#1890ff',
      light: '#fff'
    },
    elType: 'default',
    elSize: 'default'
  }
}
// 全局配置，初始化一次
export const configOptions = ref<OptionsType>(initOptions())
export function useOptions(): OptionsResultType {
  function updateThemeColor(theme: OptionsThemeType) {
    let updateTheme = Object.assign(configOptions.value.theme, theme) as Required<OptionsThemeType>
    document.getElementsByTagName('body')[0].style.setProperty('--primary', updateTheme.primary)
    configOptions.value.theme = updateTheme
  }

  return { updateThemeColor }
}
