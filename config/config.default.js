'use strict';

const path = require('path');

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1522852050569_3131';

	// add your config here
	config.middleware = ['islogin'];











	// ————————启动端口配置
	config.cluster = {
		listen: {
			//path: '',
			port:8000,
			//hostname: '',
		},
	};






	//——————————数据库连接
	config.mysql = {
		client: {
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: '123456',
			database: 'iantoo',
		},
		app: true,  // 是否加载到 app 上，默认开启
		agent: false,   // 是否加载到 agent 上，默认关闭
	};




	//静态文件服务
	config.static = {
		prefix: '/public/',
		dir: path.join(appInfo.baseDir, 'app/public'),
		dynamic: true,
		preload: false,
		buffer: false,
		maxFiles: 1000,
	};

	//
	config.view = {
		defaultViewEngine: 'nunjucks',
		mapping: {
			'.html': 'nunjucks',
		},
	};



	return config;
};


