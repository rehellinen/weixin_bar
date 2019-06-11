import {Exception} from "../../libs/exception/Exception"

export class WechatException extends Exception{
  constructor(config) {
    super(config)
    if (!this.httpCode) this.httpCode = 500
    if (!this.status) this.status = 50000
    if (!this.message) this.message = '获取全局access_token失败'
  }
}
