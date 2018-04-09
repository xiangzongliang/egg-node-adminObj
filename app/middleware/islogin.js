module.exports = options => {

	return async function islogin(ctx, next) {
		await next();
		let adminSession = ctx.session,
			loginTime = adminSession.loginTime,
			timestamp=new Date(),
			getTime = timestamp.getTime();
		if(ctx.request.url == '/login'){
			// 如果已经登陆了在访问登陆页面也跳转到首页
			if(ctx.request.method == 'GET' && ctx.session.loginTime != undefined && loginTime + 3600000 > getTime) {
				ctx.redirect('/');
			}

		}else{
			if(loginTime + 3600000 < getTime || !ctx.session.loginTime || ctx.session.loginTime == undefined){
				if(ctx.request.method == 'GET' || ctx.request.method == 'get'){
					ctx.session = null;
					ctx.redirect('/login');
				}else{
					ctx.body = {
						status:2345,
						msg:'您没有权限直接访问接口'
					}
				}
			};
		}
	};


};
