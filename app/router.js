'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.index.home);

	router.get('/login', controller.login.login);
	router.post('/login', controller.login.userLogin);

};
