/**
 *  公众号被动回复api
 *  Reply.js
 *  Create By rehellinen
 *  Create On 2018/9/27 16:59
 */
import sha1 from 'sha1'
import getRawBody from 'raw-body'
import {parseXML, formatMessage} from '../common/utils/utils'
import {Template} from '../common/wechat/Template'
import reply from '../common/wechat/ReplyService'
import fs from 'fs'
import {promisify} from 'util'
import {types} from '../libs/utils/mime'

const readAsync = promisify(fs.readFile)

export class PassiveReply {
  // 微信公众号验证
  static async validation (ctx) {
    const token = $config.TOKEN
    const {signature, timestamp, nonce, echostr} = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const shaRes = sha1(str)

    shaRes === signature ? ctx.body = echostr : ctx.body = 'fail'
  }

  // 微信公众号被动回复
  static async passiveReply (ctx) {
    const token = $config.TOKEN
    const {signature, timestamp, nonce, echostr} = ctx.query
    const str = [token, timestamp, nonce].sort().join('')
    const shaRes = sha1(str)

    if (shaRes !== signature) {
      ctx.body = 'fail'
      return
    }

    // req 相关
    const reqDataXml = await getRawBody(ctx.req, {
      length: ctx.length,
      limit: '1mb',
      encoding: ctx.charset
    })
    const content = parseXML(reqDataXml)
    ctx.wechat = formatMessage(content.xml)
    console.log(ctx.wechat)
    reply(ctx)

    // res 相关
    const xml = new Template(ctx.wechat).get()
    ctx.type = types.xml
    ctx.body = xml
  }

  static async file (ctx) {
    ctx.body = 'bTR3G8h36rV3qShu'
  }
}
