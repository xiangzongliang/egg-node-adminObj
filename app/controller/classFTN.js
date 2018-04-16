'use strict';

const Controller = require('egg').Controller;

class classCTL extends Controller {

	//进去首页
	async init() {
		await this.ctx.render('classCTL/classCTL.html',{
			title:'分类管理'
		});
	}


}


module.exports = classCTL;
