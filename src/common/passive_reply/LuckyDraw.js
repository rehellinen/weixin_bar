import {AccountModel} from "../../model/AccountModel"

// 抽奖暗号
const secret = '暗号'
const account = new AccountModel()

export class LuckyDraw {
  async constructor (info) {
    this.info = info
    // 获取当前最大的抽奖号码
    this.dbMaxNumber = await account.getMaxNumber()
    // 判断用户是否已经存在
    this.user = await account.getByOpenId(wechat.FromUserName)
  }

  // 处理用户输入文本情况
  async processText () {
    const userInput = this.info.Content
    // 用户输入暗号
    if (userInput !== secret) {
      return
    }
    if (!this.user) {
      await account.saveOne({
        open_id: this.info.FromUserName,
        number: this.dbMaxNumber + 1
      })
      this.info.content = `您已成功参与抽奖，抽奖号码为${this.dbMaxNumber + 1}`
    } else {
      this.info.content = `您已成功参与抽奖，抽奖号码为${this.user.number}`
    }
  }

  // 处理用户输入图片情况
  async processImage () {
    if (!this.user) {
      await account.saveOne({
        open_id: this.info.FromUserName,
        img_url: this.info.PicUrl,
        number: this.dbMaxNumber + 1
      })
      this.info.content = `您已成功参与抽奖，抽奖号码为${this.dbMaxNumber + 1}`
    } else {
      this.info.content = `您已成功参与抽奖，抽奖号码为${this.user.number}`
    }
  }
}
