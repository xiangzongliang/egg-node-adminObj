const Service = require('egg').Service;
class home extends Service {
	async querySeting(uid) {
		let SQLData = await this.app.mysql.select('iantoo_seting',{
			where:{
				uid:uid
			}
		});
		return SQLData;
	}
}

module.exports = home;