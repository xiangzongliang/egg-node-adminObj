const Controller = require('egg').Controller;
const qiniu = require('qiniu');





class qiniuController extends Controller {

	//获取上传海报的七牛云的token
	async getPosterToken() {
		const queryUser = await this.ctx.service.qiniuSQL.queryQiniuinfo();

		let configJson = {
			"AccessKey": queryUser[0].qiniuAK,  // https://portal.qiniu.com/user/key
			"SecretKey": queryUser[0].qiniuSK,
			"Bucket": "blogposter",
			"Port": 9000,
			"UptokenUrl": "uptoken",
			"Domain": "http://oyf8tmfgb.bkt.clouddn.com/" // bucket domain eg:http://qiniu-plupload.qiniudn.com/
		}


		var mac = new qiniu.auth.digest.Mac(configJson.AccessKey, configJson.SecretKey);


		let options = {
				scope: configJson.Bucket
			};

		let	putPolicy = new qiniu.rs.PutPolicy(options);
		let token = putPolicy.uploadToken(mac);
		this.ctx.body = {
			uptoken: token,
			domain: configJson.Domain
		}
	}

	async getImageToken(){
		const queryUser = await this.ctx.service.qiniuSQL.queryQiniuinfo();

		let configJson = {
			"AccessKey": queryUser[0].qiniuAK,  // https://portal.qiniu.com/user/key
			"SecretKey": queryUser[0].qiniuSK,
			"Bucket": "article-img",
			"Port": 9000,
			"UptokenUrl": "uptoken",
			"Domain": "http://7xqb1s.com1.z0.glb.clouddn.com/" // bucket domain eg:http://qiniu-plupload.qiniudn.com/
		}


		var mac = new qiniu.auth.digest.Mac(configJson.AccessKey, configJson.SecretKey);


		let options = {
			scope: configJson.Bucket
		};

		let	putPolicy = new qiniu.rs.PutPolicy(options);
		let token = putPolicy.uploadToken(mac);
		this.ctx.body = {
			uptoken: token,
			domain: configJson.Domain
		}
	}

}

module.exports = qiniuController;