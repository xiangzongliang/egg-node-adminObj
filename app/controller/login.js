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
		let postData = this.ctx.request.body;
		const queryUser = await this.ctx.service.islogin.login(postData);
		console.log(queryUser[0].username)
		if(queryUser.length == 0){
			this.ctx.body = {
				status:false,
				msg:'用户名或密码不正确'
			};
		}else{

			// 登陆成功存储session
			//获取当前的时间戳
			let timestamp=new Date(),
				getTime = timestamp.getTime();
			this.ctx.session = {
				uid:queryUser[0].uid,
				username:queryUser[0].username,
				loginTime : getTime
			};
			this.ctx.body = {
				status:true,
				msg:'登陆成功'
			};
		}
	}
}

module.exports = NewsController;