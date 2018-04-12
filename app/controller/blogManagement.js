const Controller = require('egg').Controller;



class bManagement extends Controller {
	async init() {

		await this.ctx.render('blogManag/blogManag.html',{
			title:'博客管理'
		});
	}




	async blogListCtl(){
		var queryblogList = await this.ctx.service.blog.queryBlogServer();
		this.ctx.body = {
			status:true,
			blogList:queryblogList.SQLqueryBlog,    
			tatol:queryblogList.tatol //博客总条数
		};

	}

}

module.exports = bManagement;