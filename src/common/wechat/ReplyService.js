/**
 *  Reply.js
 *  Create By rehellinen
 *  Create On 2018/9/26 10:12
 */
import {AccountModel} from "../../model/AccountModel"
let {MSG_TYPE, EVENT_TYPE} = $config

// 默认自动回复内容
const tip = '这里是换Bar'
// 抽奖暗号
const secret = '暗号'
const account = new AccountModel()

export default async (ctx) => {
  let wechat = ctx.wechat
  wechat.content = tip

  // 获取当前最大的抽奖号码
  const dbMaxNumber = await account.getMaxNumber()
  // 判断用户是否已经存在
  const user = await account.getByOpenId(wechat.FromUserName)

  // 文本消息
  if (wechat.MsgType === MSG_TYPE.TEXT) {
    const userInput = wechat.Content
    // 用户输入暗号
    if (userInput === secret) {
      if (!user) {
        await account.saveOne({
          open_id: wechat.FromUserName,
          number: dbMaxNumber + 1
        })
        wechat.content = `您已成功参与抽奖，抽奖号码为${dbMaxNumber + 1}`
      } else {
        wechat.content = `您已成功参与抽奖，抽奖号码为${user.number}`
      }
    }
  }

  // 图片
  if (wechat.MsgType === MSG_TYPE.IMAGE) {
    if (!user) {
      await account.saveOne({
        open_id: wechat.FromUserName,
        img_url: wechat.PicUrl,
        number: dbMaxNumber + 1
      })
      wechat.content = `您已成功参与抽奖，抽奖号码为${dbMaxNumber + 1}`
    } else {
      wechat.content = `您已成功参与抽奖，抽奖号码为${user.number}`
    }
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
