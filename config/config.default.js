'use strict';

const path = require('path');

module.exports = appInfo => {
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1522852050569_3131';

	// add your config here
	config.middleware = [];











	// ————————启动端口配置
	config.cluster = {
		listen: {
			//path: '',
			port:80,
			//hostname: '',
		},
	};






	//——————————数据库连接
	config.mysql = {
		client: {
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: 'root',
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




	//安全策略模块配置
	config.security = {
		csrf: {
			enable: false, //禁用部分安全策略功能
		},
		domainWhiteList: [ 'http://photo.xiangzongliang.com/' ], //允许访问这个源上的文件,白名单
	};





	config.bodyParser = {
		enable: true,
		formLimit: '4096kb',
		jsonLimit: '1024kb',
	};



	return config;
};


