/**
 *  custom.js
 *  Create By rehellinen
 *  Create On 2019/3/19 22:13
 */
// 该文件用于写入自定义配置
export default {
  // 公众号设置的Token
  TOKEN: '',
  // 微信公众号的appid和appsecret
  ACCOUNT: {
    APP_ID: '',
    APP_SECRET: ''
  },
  // 一些微信的API
  WECHAT_API: {
    TICKET: `https://api.weixin.qq.com/cgi-bin/ticket/getticket`,
    ACCOUNT_CODE: `https://open.weixin.qq.com/connect/oauth2/authorize`,
    ACCOUNT_ACCESS_TOKEN: `https://api.weixin.qq.com/sns/oauth2/access_token`,
    MP_CODE: `https://api.weixin.qq.com/sns/jscode2session`,
    PAY_BACK_URL: `https://20298479.rehellinen.cn/fleamarket/public/api/v2/notify`,
    QR_CODE: `https://api.weixin.qq.com/wxa/getwxacode?access_token=%s`,
    SEND_TPL: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=%s`
  },
  // 模板消息的代号
  TEMPLATE: {
    PAY: `8_8NORug_PvZOogPDB9PalirDQd6WWkW6IaWdpHuvTY`,
  },
  MSG_TYPE: {
    TEXT: 'text',
    EVENT: 'event',
    IMAGE: 'image'
  },
  EVENT_TYPE: {
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe'
  },
  STATUS: {
    NORMAL: 1,
    DELETED: -1,
    ABNORMAL: 0
  }
}
