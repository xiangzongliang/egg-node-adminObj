const Controller = require('egg').Controller;



class ClassManag extends Controller {
	async init() {
		console.log('class')
	}
}

module.exports = ClassManag;