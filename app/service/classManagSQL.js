const Service = require('egg').Service;

class classmanag extends Service {
	async queryClass() {
		let SQLqueryClass = await this.app.mysql.select('iantoo_nav');
		return SQLqueryClass;
	}



}

module.exports = classmanag;