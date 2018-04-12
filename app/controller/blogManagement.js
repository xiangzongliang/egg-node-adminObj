const Controller = require('egg').Controller;



class blogManagement extends Controller {
	async init() {
		await this.ctx.render('blogManag/blogManag.html',{
			title:'博客管理'
		});
	}




	async blogListCtl(){
		let queryBody = this.ctx.request.body;

		let opction = {
				offset:(queryBody.page - 1) * 10,
				limit:queryBody.limit
			}






		let queryblogList = await this.ctx.service.blog.queryBlogServer(opction);

		

		this.ctx.body = {
			status:true,
			code:0,
			msg:'返回成功',
			data:queryblogList.SQLqueryBlog,
			count:queryblogList.tatol //博客总条数
		};

	}

}

module.exports = blogManagement;