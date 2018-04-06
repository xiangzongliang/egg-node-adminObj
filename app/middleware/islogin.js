module.exports = options => {

	return async function islogin(ctx, next) {
		await next();
		if(ctx.request.url == '/login'){
			// 不做处理
		}else{
			let adminSession = ctx.session,
				loginTime = adminSession.loginTime,
				timestamp=new Date(),
				getTime = timestamp.getTime();
			if(loginTime + 3600000 < getTime || !ctx.session.loginTime || ctx.session.loginTime == undefined){
				ctx.session = null //清除缓存并重定向

				if(ctx.request.method == 'GET' || ctx.request.method == 'get'){
					ctx.redirect('/login');
				}else{
					ctx.body = {
						status:2345,
						msg:'您没有权限直接访问接口'
					}
				}
			}
		}
	};


};
