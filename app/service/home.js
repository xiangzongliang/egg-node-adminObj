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

	async editAliyun(aliyunInfo) {
		let SQLaliyun= await this.app.mysql.update('iantoo_seting', {
			aliyunKEYID:aliyunInfo.aliyunKeyid,
			aliyunKEYSecret:aliyunInfo.aliyunKeysec
		},{
			where: {
				uid: 1
			}
		})
		return SQLaliyun
	}



	async editqiniuyun(qiniuyunInfo){
		let SQLqiniuyun= await this.app.mysql.update('iantoo_seting', {
			qiniuAK:qiniuyunInfo.qiniuAK,
			qiniuSK:qiniuyunInfo.qiniuSK
		},{
			where: {
				uid: 1
			}
		})
		return SQLqiniuyun

	}
}

module.exports = home;