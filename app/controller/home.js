'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.time('total')

    let config = {
      method: 'POST',
      url: 'https://api.paixin.com/user/detail',
      data: {
        user_id: '254535'
      }
    }

    try {
      console.time('request')
      let res = await this.ctx.axios(config)
      console.timeEnd('request')

      if (res.data.out == '1') {
        console.time('render')
        await this.ctx.render('home/index.html', { avatar: res.data.data.avatar });
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
