/**
 *  Signature.js
 *  Create By rehellinen
 *  Create On 2018/9/27 19:20
 */
import {SignService} from '../common/wechat/SignService'
import {SuccessMessage} from "../common/exception/SuccessMessage"

export class Signature {
  static async getSignature (ctx) {
    const retData = await (new SignService(ctx.query.url)).sign()
    throw new SuccessMessage({
      data: retData
    })
  }
}
