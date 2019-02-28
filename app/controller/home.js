'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let config = {
      method: 'GET',
      url: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290'
    }

    try {
      let res = await this.ctx.axios(config)

      if (res.status == '200') {
        await this.ctx.render('home/index.html', { list: res.data.movies });
      } else {
        this.ctx.body = res.data.msg
      }
    } catch (e) {
      console.log(e)

      this.ctx.body = 'error'
    }
  }
}

module.exports = HomeController;
