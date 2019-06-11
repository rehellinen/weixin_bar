/**
 *  BaseModel.js
 *  Create By rehellinen
 *  Create On 2018/9/25 18:32
 */
import Knex from 'knex'
import Bookshelf from 'bookshelf'

export class DataBase {
  static getInstance () {
    if (!this.db) {
      DataBase._connect()
    }
    return this.db
  }

  static _connect () {
    const knex = Knex({
      client: 'mysql',
      connection: $config.DATABASE
    })

    this.db = Bookshelf(knex)
    this.db.plugin('pagination')
  }
}
