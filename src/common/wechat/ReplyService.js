/**
 *  Reply.js
 *  微信公众号被动回复
 *  Create By rehellinen
 *  Create On 2018/9/26 10:12
 */
import {LuckyDraw} from '../passive_reply/LuckyDraw'

const {MSG_TYPE, EVENT_TYPE} = $config

export default async (ctx) => {
  const wechat = ctx.wechat
  const luckyDraw = await new LuckyDraw(wechat)

  // 设置默认回复的内容
  wechat.content = '这里是换Bar'
  wechat.type = MSG_TYPE.TEXT

  // 文本消息
  if (wechat.MsgType === MSG_TYPE.TEXT) {
    await luckyDraw.processText()
  }

  // 图片
  if (wechat.MsgType === MSG_TYPE.IMAGE) {
    await luckyDraw.processImage()
  }

  // 关注或取消关注
  if (wechat.MsgType === MSG_TYPE.EVENT) {
    // 关注
    if (wechat.Event === EVENT_TYPE.SUBSCRIBE) {
      wechat.content = '欢迎关注我们~'
    }
    // 取消关注
    if (wechat.Event === EVENT_TYPE.UNSUBSCRIBE) {
    }
  }
}
