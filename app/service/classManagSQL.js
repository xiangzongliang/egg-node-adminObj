const Service = require('egg').Service;

class classmanag extends Service {
	async queryClass() {
		let SQLqueryClass = await this.app.mysql.select('iantoo_nav');
		return SQLqueryClass;
	}

	async queryParentList(){
		let SQLqueryClass = await this.app.mysql.select('iantoo_nav',{
			where: {
				parent: 1
			},
		});
		return SQLqueryClass;
	}



}

module.exports = classmanag;