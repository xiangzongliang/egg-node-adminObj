'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

	// 主页
    router.get('/', controller.index.home);
	router.get('/logout', controller.index.logout); //退出登录
	router.post('/editAliyunKey', controller.index.editAliyunKey); //修改阿里云的Key
	router.post('/editQiniuyun', controller.index.editQiniuyun); //修改七牛云的Key
	router.post('/editslogan', controller.index.editSlogan); //修改标语
	router.post('/editsPassword', controller.index.editsPassword); //修改密码

    // 登陆页面
	router.get('/login', controller.login.login);
	router.post('/login', controller.login.userLogin);

	// 添加博客
	router.get('/addblog', controller.addblog.init);
	router.post('/addblog', controller.addblog.addBlog);


	//获取七牛云token
	router.post('/getPosterToken', controller.qiniu.getPosterToken); //上传海报的token
	router.post('/getImageToken', controller.qiniu.getImageToken); //上传图片的token


};
