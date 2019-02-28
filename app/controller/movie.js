'use strict';

const Controller = require('egg').Controller;

class NewsController extends Controller {
  async index() {
    let id = this.ctx.params.id;
    await this.ctx.render('movie/index.html', { id: id });
  }
}

module.exports = NewsController;
