const Service = require('egg').Service;
class webser extends Service {

	//查询首页文章标题列表
	async queryAhvServer() {
		let querytitleList = await this.app.mysql.select('iantoo_blog',{
			columns: ['bid', 'title','date'], // 要查询的表字段
			orders: [['bid','desc']], // 排序方式
			where: {
				views: 'y'
			}
			//limit: 10, // 返回数据量
			//offset: 0, // 数据偏移量
		});
		return querytitleList;
	}




	//查询音乐播放列表
	async queryMusic(){
		let querymusicList = await this.app.mysql.select('iantoo_backgroundmusic');
		return querymusicList;
	}




	//查询博客列表
	async blogListServer(pageInfo){
		let pageindex = (pageInfo.index - 1)*10
		let queryblogList = await this.app.mysql.select('iantoo_blog',{
			where:{
				views: 'y'
			},
			columns: ['bid', 'title','date','blogPoster','OTCcontent','blogLable','flow'], // 要查询的表字段
			orders: [['bid','desc']], // 排序方式
			limit: 10, // 返回数据量
			offset: pageindex, // 数据偏移量
		});

		let blogtotale = await this.app.mysql.select('iantoo_blog',{
			where:{
				views: 'y'
			},
			columns: ['bid'] // 要查询的表字段
		});
		return { queryblogList,blogtotale };
	}





	//查询博客详情
	async blogContent(opction){
		let queryblogContentInfo = await this.app.mysql.select('iantoo_blog',{
			where:{
				bid: opction.id
			},
			columns: ['bid', 'content','title','flow'],
		});
		let blogComment = await this.app.mysql.select('iantoo_comment',{
			where:{
				bid: opction.id,
				display:'y'
			},
			columns: ['bid', 'pid','content','adddate','appellation','url','avatar'],
		});
		let blogCommentReply = await this.app.mysql.select('iantoo_commentreply',{
			where:{
				bid: opction.id
			}
		});
		return { queryblogContentInfo,blogComment,blogCommentReply };
	}
}

module.exports = webser;
