const Service = require('egg').Service;

class comment extends Service {
	async queryCommentList(opction) {
		let pageIndex = (opction.pageIndex - 1) * 10,
			pagesize = opction.pageSize

		let totalList = await this.app.mysql.select('iantoo_comment',{
			columns: ['pid'],
			where: {
				display: 'y'
			}
		});
		let	total = totalList.length;
		let querySQL = `SELECT * FROM 
            (SELECT bid,pid,appellation,content,adddate,url FROM iantoo_comment  WHERE display='y' ORDER BY pid DESC LIMIT ${pageIndex},${pagesize}) AS comment 
            LEFT JOIN
            (SELECT bid,title FROM iantoo_blog) AS blog ON comment.bid = blog.bid
            LEFT JOIN 
            (SELECT cpid,pid AS pidR,bid AS bidR,CPcontent,addTime AS addTimeR,ReplyName,RepliedName FROM iantoo_commentreply) AS comrly ON comment.pid = comrly.pidR`
		let commentList = await this.app.mysql.query(querySQL);

		return { commentList,total };
	}




	//后台添加回复
	async addReply(data){
		let addReplySQL = await this.app.mysql.insert('iantoo_commentreply', {
			pid: data.pid,
			bid: data.bid,
			RepliedName: data.RepliedName,
			CPcontent: data.CPcontent,
			addTime: data.addTime,
			ReplyName:'言图网'
		});

		if(addReplySQL){
			return true;
		}
	}




	async delReply(opction){
		let updateComment = await this.app.mysql.update('iantoo_comment', {
			display:'n'
		},{
			where: {
				pid: opction.pid
			}
		})

		if(updateComment){
			return true
		}else{
			return false
		}
	}


}

module.exports = comment;