'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

	// 主页
    router.get('/', controller.index.home);


    // 登陆页面
	router.get('/login', controller.login.login);
	router.post('/login', controller.login.userLogin);

};
