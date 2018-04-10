const Service = require('egg').Service;
const MD5pass = require('md5');
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



	async editSlogan(editslognVal){
		let SQLeditSlogan= await this.app.mysql.update('iantoo_seting', {
			slogan:editslognVal.slogan
		},{
			where: {
				uid: 1
			}
		})
		return SQLeditSlogan
	}


	async editPassword(psdVal,uid){
		let SQLeditPassword= await this.app.mysql.update('iantoo_user', {
			password:MD5pass(psdVal.password)
		},{
			where: {
				uid: uid
			}
		})
		return SQLeditPassword
	}
}

module.exports = home;