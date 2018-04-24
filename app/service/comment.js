const Service = require('egg').Service;

class comment extends Service {
	async queryCommentList(opction) {


		let querySQL = `SELECT * FROM 
            (SELECT bid,pid,appellation,content,adddate,url FROM iantoo_comment  ORDER BY pid DESC LIMIT 0,12) AS comment 
            LEFT JOIN
            (SELECT bid,title FROM iantoo_blog) AS blog ON comment.bid = blog.bid
            LEFT JOIN 
            (SELECT cpid,pid AS pidR,bid AS bidR,CPcontent,addTime AS addTimeR,ReplyName,RepliedName FROM iantoo_commentreply) AS comrly ON comment.pid = comrly.pidR`
		let commentList = await this.app.mysql.query(querySQL);
		return commentList;
	}



}

module.exports = comment;