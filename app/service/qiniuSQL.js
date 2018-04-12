const Service = require('egg').Service;
class qiniuQuery extends Service {
	async queryQiniuinfo() {
		let sqlqiniu = await this.app.mysql.select('iantoo_seting',{
			where:{
				uid:1,
			},
			columns: ['qiniuAK', 'qiniuSK'], // 要查询的表字段
		});
		return sqlqiniu;
	}
}

module.exports = qiniuQuery;
