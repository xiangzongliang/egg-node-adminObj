'use strict';
const path = require('path');
module.exports = appInfo => {
	const config = exports = {};
	// ————————启动端口配置
	config.cluster = {
		listen: {
			//path: '',
			port:8010,
			//hostname: '',
		},
	};
	//——————————数据库连接
	config.mysql = {
		client: {
			host: 'localhost',
			port: '3306',
			user: 'xiangzongliang',
			password: 'xiang0612liang327411',
			database: 'iantoo',
		},
		app: true,  // 是否加载到 app 上，默认开启
		agent: false,   // 是否加载到 agent 上，默认关闭
	};


	return config;
};
