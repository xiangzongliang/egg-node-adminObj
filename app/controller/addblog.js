const Controller = require('egg').Controller;



class addblog extends Controller {
	async init() {
		var queryClass = await this.ctx.service.classManagSQL.queryClass();
		await this.ctx.render('addblog/addblog.html',{
			title:'添加博客',
			classList:queryClass
		});
	}


	//新增博客文章
	async addBlogCtl(){
		let postData = this.ctx.request.body,
			getDate;
		//处理时间
		if(postData.date == ''){
			getDate = new Date();
		}else{
			getDate = new Date(postData.date)
		}
		postData.date = getDate.getTime();
		var queryAddblog = await this.ctx.service.blog.addblogServer(postData);
		if(queryAddblog){
			this.ctx.body = {
				status:true,
				msg:'保存成功'
			};
		}else{
			this.ctx.body = {
				status:false,
				msg:'保存失败'
			};
		}

	}
}

module.exports = addblog;