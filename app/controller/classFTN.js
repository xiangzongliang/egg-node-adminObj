'use strict';

const Controller = require('egg').Controller;

class classCTL extends Controller {

	//进去首页
	async init() {
		// await this.ctx.render('drafts/drafts.html',{
		// 	title:'草稿箱'
		// });

		await this.ctx.render('classCTL/classCTL.html',{
			title:'分类管理',
		});
	}


	//查询分类列表
	async queryClassList(){
		let queryClass = await this.ctx.service.classManagSQL.queryClass();

		this.ctx.body = {
			status:true,
			code:0,
			msg:'返回成功',
			data:queryClass,
			count:queryClass.length
		};
	}


}


module.exports = classCTL;
