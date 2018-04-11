const Controller = require('egg').Controller;
const qiniu = require('qiniu');





class qiniuController extends Controller {

	//获取七牛云的token
	async getToken() {
		const queryUser = await this.ctx.service.qiniuSQL.queryQiniuinfo();
		let mac = qiniu.auth.digest.Mac(queryUser[0].qiniuAK, queryUser[0].qiniuSK);
		let options = {
				scope: 'article-img'
			},
			putPolicy = new qiniu.rs.PutPolicy(options),
			uploadToken=putPolicy.uploadToken(mac);



		this.ctx.body = {
			ak : queryUser[0].qiniuAK,
			token : uploadToken
		}
	}

}

module.exports = qiniuController;