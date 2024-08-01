import type { PropsType } from './types'
import { createMessage, initProps } from './method'

export const notificationClass = `t-notification`

/***************  快捷操作 ********************/
// 快捷message触发
function message(content: string, type?: PropsType['type'], config?: PropsType) {
  return createMessage(
    initProps(
      Object.assign(
        {
          content,
          type
        },
        config,
        { messageType: 'notice' }
      )
    )
  )
}
export default {
  message,
  info: (content: string) => message(content, 'info'),
  success: (content: string) => message(content, 'success'),
  warning: (content: string) => message(content, 'warning'),
  danger: (content: string) => message(content, 'danger')
}
