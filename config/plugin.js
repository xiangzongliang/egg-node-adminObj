'use strict';

// had enabled by egg


module.exports = {
	mysql:{
		enable: true,
		package: 'egg-mysql',
	},
	assets:{
		enable: false,
		package: 'egg-view-assets',
	},
	nunjucks:{
		enable: true,
		package: 'egg-view-nunjucks',
	},
	cors : {
		enable: true,
		package: 'egg-cors',
	},
}