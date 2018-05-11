const Service = require('egg').Service;
class webser extends Service {

	//查询首页文章标题列表
	async queryAhvServer() {
		let querytitleList = await this.app.mysql.select('iantoo_blog',{
			columns: ['bid', 'title','date'], // 要查询的表字段
			orders: [['bid','desc']], // 排序方式
			where: {
				views: 'y',
				Draft:"n"
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

		let queryBlogListSQL = `SELECT blog.bid,ifnull(com.discuss,0) AS discuss,blog.title,blog.date,blog.flow,blog.OTCcontent,blog.blogLable,blog.blogPoster
								FROM (SELECT bid,title,date,flow,OTCcontent,blogLable,blogPoster FROM iantoo_blog WHERE Draft='n' AND views='y' ORDER BY bid DESC LIMIT 10 OFFSET ${pageindex}) AS blog 
								LEFT JOIN (SELECT COUNT(bid) AS discuss,bid FROM iantoo_comment GROUP BY bid) AS com 
								ON blog.bid=com.bid`

		let queryblogList = await this.app.mysql.query(queryBlogListSQL);


		let blogtotale = await this.app.mysql.select('iantoo_blog',{
			where:{
				views: 'y',
				Draft:"n"
			},
			columns: ['bid'] // 要查询的表字段
		});
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
}

module.exports = webser;
