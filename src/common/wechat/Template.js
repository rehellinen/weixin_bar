/**
 *  template.js
 *  返回微信服务器的XML数据
 *  Create By rehellinen
 *  Create On 2018/9/26 20:07
 */
import X2JS from 'x2js'
const x2js = new X2JS({
  escapeMode: false
})
const {MSG_TYPE} = $config


export class Template {
  /**
   * @param data 包含了返回给微信服务器所需的所有信息
   *   type - 消息类型
   *   content - 文本消息内容
   * 构造函数处理的公共参数：
   *   FromUserName - 公众号AppId
   *   ToUserName - 用户OpenId
   *   CreateTime - 创建时间
   *   MsgType - 消息类型
   */
  constructor (data) {
    this.data = data
    // 设置默认返回的文本消息
    if (!data.content) {
      data.content = '暂无信息~'
    }
    // 返回微信服务器的消息
    this.response = {
      ToUserName: `<![CDATA[${data.FromUserName}]]>`,
      FromUserName: `<![CDATA[${data.ToUserName}]]>`,
      CreateTime: new Date().getTime(),
      MsgType: data.type
    }
  }

  /**
   * 主方法，获得最终返回微信服务器的数据
   * @returns {string}
   */
  get () {
    if (this.data.type === MSG_TYPE.TEXT) this.processText()

    let rawXml = x2js.js2xml(this.response)
    return `<xml>${rawXml}</xml>`
  }

  /**
   * 回复文本信息，特有参数为：
   *   Content - 需要返回的文本内容
   */
  processText () {
    this.response['Content'] = `<![CDATA[${this.data.content}]]>`
  }
}
