/**
 *  router.js
 *  Create By rehellinen
 *  Create On 2018/10/25 20:37
 */
import Router from 'koa-router'
import glob from 'glob'
import R from 'ramda'
import {r} from "../utils/utils"
import {routerMap} from "../decorator/router"

export const router = app => {
  const router = new Router()
  // 执行路由文件
  R.map(require)(glob.sync(r('./common/router/*.js')))

  // 生成路由
  for (let [conf, action] of routerMap) {
    const routerPath = conf.target.routerPrefix + conf.path
    router[conf.method](routerPath, ...action)
  }
  app.use(router.routes())
  app.use(router.allowedMethods())
}
