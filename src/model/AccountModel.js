/**
 *  IndexModel.js
 *  Create By rehellinen
 *  Create On 2019/3/19 23:05
 */
import {BaseModel} from "./BaseModel"

export class AccountModel extends BaseModel {
  constructor() {
    super({
      tableName: 'account'
    })
  }

  // 获取当前最大的抽奖号码
  async getMaxNumber () {
    const res = await this.getOne({
      condition: {
        status: $config.STATUS.NORMAL
      },
      order: ['number']
    })
    return res.number
  }

  // 判断用户是否已经存在
  async getByOpenId (openId) {
    try {
      return await this.getOne({
        condition: {
          status: $config.STATUS.NORMAL,
          open_id: openId
        }
      })
    } catch (e) {
      // 没有用户
      console.log(e)
      return null
    }
  }
}
