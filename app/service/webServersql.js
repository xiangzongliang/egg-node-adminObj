const Service = require('egg').Service;
class webser extends Service {

	//查询首页文章标题列表
	async queryAhvServer() {
		let querytitleList = await this.app.mysql.select('iantoo_blog',{
			columns: ['bid', 'title','date'], // 要查询的表字段
			orders: [['bid','desc']], // 排序方式
			where: {
				views: 'y',
				Draft:"n",
				type:'blog'
			}
			//limit: 10, // 返回数据量
			//offset: 0, // 数据偏移量
		});
		return querytitleList;
	}




	//查询音乐播放列表
	async queryMusic(){
		let querymusicList = await this.app.mysql.select('iantoo_backgroundmusic',{
			orders: [['muid','desc']], // 排序方式
		});
		return querymusicList;
	}




	//查询博客列表
	async queryblogListServer(pageInfo){
		let pageindex = (pageInfo.index - 1)*10
		var queryBlogListSQL = `SELECT blog.bid,ifnull(com.discuss,0) AS discuss,blog.title,blog.date,blog.flow,blog.OTCcontent,blog.blogLable,blog.blogPoster
								FROM (SELECT bid,title,date,flow,OTCcontent,blogLable,blogPoster FROM iantoo_blog WHERE title LIKE '%${pageInfo.title}%' AND blogLable LIKE '%${pageInfo.type}%' AND type='blog' AND Draft='n' AND views='y' ORDER BY bid DESC LIMIT 10 OFFSET ${pageindex}) AS blog 
								LEFT JOIN (SELECT COUNT(bid) AS discuss,bid FROM iantoo_comment GROUP BY bid) AS com 
								ON blog.bid=com.bid`
		var blogtotale = await this.app.mysql.query(`SELECT bid FROM iantoo_blog WHERE title LIKE '%${pageInfo.title}%' AND blogLable LIKE '%${pageInfo.type}%'AND type='blog' AND views='y' AND Draft='n'`);

		//查询博客列表的信息
		let queryblogList = await this.app.mysql.query(queryBlogListSQL);

		//查询博客列表的总数据

		return { queryblogList,blogtotale };
	}





	//查询博客详情
	async blogContent(opction){
		let fmtDate = (timeStamp)=>{
			var date = new Date();
			date.setTime(timeStamp);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		}
		//查询博客内容
		let queryblogContentInfo = await this.app.mysql.select('iantoo_blog',{
			where:{
				bid: opction.id
			},
			columns: ['bid', 'content','title','flow'],
		});
		//查询评论内容
		let blogComment = await this.app.mysql.select('iantoo_comment',{
			where:{
				bid: opction.id,
				display:'y'
			},
			columns: ['bid', 'pid','content','adddate','appellation','url','avatar'],
		});
		//查询评论回复的内容
		let blogCommentReply = await this.app.mysql.select('iantoo_commentreply',{
			where:{
				bid: opction.id
			}
		});
		//博客浏览量自动加一
		let blogFlowaddOne = await this.app.mysql.query(`UPDATE iantoo_blog SET flow=flow + 1 WHERE bid=${opction.id}`)
		//添加访问统计
		let thisDate = new Date(),
			thisDateNum = thisDate.getTime(),
			timeChuo = parseInt(thisDateNum/1000),
			thisTime = fmtDate(thisDateNum);
		let addReadingBlog = await this.app.mysql.insert('iantoo_readingstatistics',{
			date:timeChuo,
			bid:opction.id,
			viewdate:thisTime
		})



		//数据时间处理
		for(let ci in blogComment){
			blogComment[ci].adddate = fmtDate(blogComment[ci].adddate * 1000)
		}
		for(let ri in blogCommentReply){
			blogCommentReply[ri].addTime = fmtDate(blogCommentReply[ri].addTime * 1000)
		}




		return { queryblogContentInfo,blogComment,blogCommentReply };
	}




	// 添加评论
	async addblogComment(data){
		let thisDate = new Date();
		let timeC = parseInt(thisDate.getTime()/1000)
		let addComment = await this.app.mysql.insert('iantoo_comment', {
			bid: data.bid,
			content:data.content,
			adddate:timeC,
			appellation:data.username,
			url:data.userUrl,
			isQQuser:data.islogin == '' ? 'no' : 'yes'
		});
		return addComment;
	}



	//查询NAV列表
	async querynavList(){
		let querynavListSQL = await this.app.mysql.select('iantoo_nav',{
			where:{
				display: 'y'
			},
			orders: [['sort','asc']], // 排序方式
			columns: ['Cname', 'Ename','nid'],
		});
		return querynavListSQL
	}



	//邮件推送的时候查询博客信息并推送
	async emailQueryBlogInfo(bid){
		let emailQueryBlogInfoSQL = await this.app.mysql.select('iantoo_blog',{
			where:{
				bid: bid
			},
			//orders: [['sort','asc']], // 排序方式
			columns: ['title'],
		});
		return emailQueryBlogInfoSQL
	}


    timeConversion(timeStamp){
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	}
}

module.exports = webser;
