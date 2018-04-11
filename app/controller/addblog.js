const Controller = require('egg').Controller;



class addblog extends Controller {
	async init() {
		var queryClass = await this.ctx.service.classManagSQL.queryClass();
		await this.ctx.render('addblog/addblog.html',{
			title:'添加博客',
			classList:queryClass
		});
	}
}

module.exports = addblog;