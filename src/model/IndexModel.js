/**
 *  IndexModel.js
 *  Create By rehellinen
 *  Create On 2019/3/19 23:05
 */
import {Model} from "../libs/model/Model"

export class IndexModel extends Model {
  constructor() {
    super({
      tableName: 'article'
    })
  }
}
