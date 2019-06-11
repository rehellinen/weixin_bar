import {controller, get, post} from "../../libs/decorator/router"
import {PassiveReply} from "../../controller/PassiveReply"

/**
 * 微信公众号相关
 */
@controller('wechat')
export class PassiveRouter {
  // 微信公众号验证
  @get('')
  async validation (ctx) {
    await PassiveReply.validation(ctx)
  }

  // 微信公众号被动回复
  @post('')
  async passiveReply (ctx) {
    await PassiveReply.passiveReply(ctx)
  }
}
