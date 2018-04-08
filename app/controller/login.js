const Controller = require('egg').Controller;



class NewsController extends Controller {
	async login() {
		await this.ctx.render('login/login.html');
	}


	async userLogin() {
		let postData = this.ctx.request.body;
		const queryUser = await this.ctx.service.islogin.login(postData);
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