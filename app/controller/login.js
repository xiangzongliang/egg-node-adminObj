const Controller = require('egg').Controller;

class NewsController extends Controller {
	async login() {
		const dataList = {
			list: [
				{ id: 1, title: 'this is news 1', url: '/news/1' },
				{ id: 2, title: 'this is news 2', url: '/news/2' }
			]
		};
		await this.ctx.render('login/login.html', dataList);
	}


	async userLogin() {
		let sqliantoo = await this.app.mysql.select('iantoo_nav');
		this.ctx.body = sqliantoo;
		console.log('接受了请求')

	}
}

module.exports = NewsController;