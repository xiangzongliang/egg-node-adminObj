const Service = require('egg').Service;

class comment extends Service {
	async queryCommentList(opction) {
		let pageIndex = (opction.pageIndex - 1) * 10,
			pagesize = opction.pageSize

		let totalList = await this.app.mysql.select('iantoo_comment',{
			columns: ['pid']
		});
		let	total = totalList.length;
		let querySQL = `SELECT * FROM 
            (SELECT bid,pid,appellation,content,adddate,url FROM iantoo_comment  ORDER BY pid DESC LIMIT ${pageIndex},${pagesize}) AS comment 
            LEFT JOIN
            (SELECT bid,title FROM iantoo_blog) AS blog ON comment.bid = blog.bid
            LEFT JOIN 
            (SELECT cpid,pid AS pidR,bid AS bidR,CPcontent,addTime AS addTimeR,ReplyName,RepliedName FROM iantoo_commentreply) AS comrly ON comment.pid = comrly.pidR`
		let commentList = await this.app.mysql.query(querySQL);

		return { commentList,total };
	}



}

module.exports = comment;