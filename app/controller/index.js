'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	  async home() {

	      let uid = this.ctx.session.uid

		  let querySeting = await this.ctx.service.home.querySeting(uid);

		  querySeting[0].title = '基础配置'


	      await this.ctx.render('home/home.html',querySeting[0]);
	  }
}

module.exports = HomeController;
