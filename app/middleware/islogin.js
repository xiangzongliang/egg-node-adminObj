module.exports = options => {
	return async function islogin(ctx, next) {
		await next();
		const adminSession = ctx.session;
		console.log('执行了中间件')
	};
};
