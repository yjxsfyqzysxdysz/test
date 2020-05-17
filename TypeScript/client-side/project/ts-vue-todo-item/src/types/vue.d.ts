import Vue from 'vue'
import { Message } from 'ant-design-vue/types/message'

/**
 * 给组件需要用到
 * 而没有声明文件的第三方组件
 * 增加声明文件
 */

declare module 'vue/types/vue' {
  interface Vue {
    $message: Message
  }
}
