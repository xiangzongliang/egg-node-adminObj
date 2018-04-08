'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

	// 主页
	router.get('', controller.index.home);
    router.get('/', controller.index.home);
	router.get('/home', controller.index.home);
	router.post('/editAliyunKey', controller.index.editAliyunKey); //修改阿里云的Key
	router.post('/editQiniuyun', controller.index.editQiniuyun); //修改七牛云的Key


    // 登陆页面
	router.get('/login', controller.login.login);
	router.post('/login', controller.login.userLogin);

	// 添加博客
	router.get('/addblog', controller.addblog.init);

};
