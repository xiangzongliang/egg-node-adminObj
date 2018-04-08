const Controller = require('egg').Controller;



class addblog extends Controller {
	async init() {
		await this.ctx.render('addblog/addblog.html',{
			title:'添加博客'
		});
	}
}

module.exports = addblog;