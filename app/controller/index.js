'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async home() {
		let sqliantoo = await this.app.mysql.select('iantoo_nav');
		this.ctx.body = sqliantoo;
	}
}

module.exports = HomeController;
