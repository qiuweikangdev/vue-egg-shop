/*
 * @Descripttion: 搜索模块业务逻辑
 * @version:
 * @Author: qqqiu
 * @Date: 2020-01-21 17:32:16
 * @LastEditors: qqqiu
 * @LastEditTime: 2020-04-15 14:16:25
 */
"use strict";
const Service = require("egg").Service;
class SearchService extends Service {
  //根据商品名字搜索 (模糊查询)
  async searchGoods(params) {
    const { name } = params;
    let sqlStr =
      'SELECT * FROM goods WHERE product_name LIKE "' + `%${name}%` + '"';
    let result;
    await this.app.mysql
      .query(sqlStr)
      .then((res) => {
        if (res.length > 0) {
          result = { code: 200, message: res, ok: 1 };
        } else {
          result = { code: 200, message: "暂无相关商品", ok: 0 };
        }
      })
      .catch((error) => {
        console.log(error);
        result = { code: 500, error: error };
      });
    return result;
  }

  //根据用户名搜索用户
  async searchUser(params) {
    const { username } = params;
    let sqlStr =
      'SELECT * FROM users WHERE username LIKE "' + `%${username}%` + '"';
    let result = await this.app.mysql.query(sqlStr);
    if (result.length > 0) {
      return {
        code: 200,
        ok: 1,
        data: result,
      };
    } else {
      return {
        code: 200,
        ok: 0,
        message: "暂无数据",
      };
    }
  }
  async searchOrder(params) {
    const { user_id } = params;
    let sqlStr = 'SELECT * FROM orders WHERE user_id ="' + user_id + '"';
    let result = await this.app.mysql.query(sqlStr);
    if (result.length > 0) {
      return {
        code: 200,
        ok: 1,
        data: result,
      };
    } else {
      return {
        code: 200,
        ok: 0,
        message: "暂无数据",
      };
    }
  }
}
module.exports = SearchService;
