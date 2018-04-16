const Controller = require('egg').Controller;



class editblog extends Controller {
	async init() {


		var queryClass = await this.ctx.service.classManagSQL.queryClass();
		await this.ctx.render('editblog/editblog.html',{
			title:'编辑博客',
			classList:queryClass,
		});
	}





	async queryBlog(){
		let getbody = this.ctx.request.body;
		let blogContent = await this.ctx.service.blog.queryBlogInfo(getbody.bid);
		this.ctx.body = {
			status:true,
			msg:blogContent
		};
	}


	async updataBlog(){
		let updataBody = this.ctx.request.body;
		let upDataBlogContent = await this.ctx.service.blog.upDataBlogInfo(updataBody);
		console.log(upDataBlogContent);
		if(upDataBlogContent){
			this.ctx.body = {
				status:true,
				msg:'修改成功'
			};
		}else{
			this.ctx.body = {
				status:false,
				msg:'修改失败'
			};
		}
	}



}

module.exports = editblog;