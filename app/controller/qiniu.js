const Controller = require('egg').Controller;
const qiniu = require('qiniu');





class qiniuController extends Controller {

	//获取七牛云的token
	async getPosterToken() {
		const queryUser = await this.ctx.service.qiniuSQL.queryQiniuinfo();
		let mac = qiniu.auth.digest.Mac(queryUser[0].qiniuAK, queryUser[0].qiniuSK);
		let options = {
				scope: 'article-img'
			},
			putPolicy = new qiniu.rs.PutPolicy(options),
			uploadToken = putPolicy.uploadToken(mac);





		this.ctx.body = {
			uptoken : queryUser[0].qiniuAK + uploadToken.replace('<PLEASE APPLY YOUR ACCESS KEY>',"")
		}
	}

}

module.exports = qiniuController;