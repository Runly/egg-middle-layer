'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.time('total')

    let config = {
      method: 'GET',
      url: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290'
    }

    try {
      console.time('request')
      let res = await this.ctx.axios(config)
      console.timeEnd('request')

      if (res.status == '200') {
        console.time('render')
        await this.ctx.render('home/index.html', { list: res.data.movies });
        console.timeEnd('render')
      } else {
        this.ctx.body = res.data.msg
      }

      console.timeEnd('total')
    } catch (e) {
      console.log(e)
      this.ctx.body = 'error'
    }
  }
}

module.exports = HomeController;
