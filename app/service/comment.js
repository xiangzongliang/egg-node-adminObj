const Service = require('egg').Service;

class comment extends Service {
	async queryCommentList(opction) {
		let commentList = await this.app.mysql.select('iantoo_comment');
		let replyCommentList = await this.app.mysql.select('iantoo_commentreply');
		return { commentList,replyCommentList };
	}



}

module.exports = comment;