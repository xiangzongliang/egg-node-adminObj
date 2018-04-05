const MD5pass = require('md5');
const Service = require('egg').Service;
class ISloginServer extends Service {
	async login(postData) {
		console.log(postData)
		let sqliantoo = await this.app.mysql.select('iantoo_user',{
			where:{
				username:postData.userName,
				password:MD5pass(postData.password)
			}
			//columns: ['author', 'title'], // 要查询的表字段
			//orders: [['created_at','desc'], ['id','desc']], // 排序方式
			//limit: 10, // 返回数据量
			//offset: 0, // 数据偏移量
		});
		return sqliantoo;
	}
}

module.exports = ISloginServer;
