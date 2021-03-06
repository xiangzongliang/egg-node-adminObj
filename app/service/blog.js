const Service = require('egg').Service;

class blog extends Service {


	//添加博客文章
	async addblogServer(opction) {

		let addBlogDate = new Date(opction.date),
			type = 'blog';
		if(opction.blogLable.indexOf('tool') >= 0){
			type = 'tool'
		}

		let SQLaddBlog = await this.app.mysql.insert('iantoo_blog', {
			blogLable:opction.blogLable,
			title:opction.title,
			date:parseInt(addBlogDate.getTime() / 1000),
			editdate:0,
			content:opction.content,
			OTCcontent:opction.OTCcontent,
			entype:'',
			navParentEn:'',
			Draft:opction.Draft,
			markDown:opction.markDown,
			blogPoster:opction.blogPoster,
			type:type,
		});
		return SQLaddBlog;
	}


	//查询博客文章
	async queryBlogServer(opction){
		// let SQLqueryBlog = await this.app.mysql.select('iantoo_blog',{
		// 	where: {
		// 		Draft: 'n'
		// 	},
		// 	columns: ['bid', 'title','date','flow'], // 要查询的表字段
		// 	orders: [['bid','desc']],// 排序方式
		// 	limit: parseInt(opction.limit), // 返回数据量
		// 	offset:parseInt(opction.offset), // 数据偏移量
		// });
		let querySQL,Draft;

		//如果查询草稿箱
		if(opction.drafts == true){
			Draft = 'y'
		}else{
			Draft = 'n'
		}


		querySQL = `SELECT blog.bid,ifnull(com.discuss,0) AS discuss,blog.title,blog.date,blog.flow
FROM (SELECT bid,title,date,flow FROM iantoo_blog WHERE Draft='${Draft}' ORDER BY bid DESC LIMIT ${parseInt(opction.offset)},${parseInt(opction.limit)}) AS blog 
LEFT JOIN (SELECT COUNT(bid) AS discuss,bid FROM iantoo_comment WHERE display='y' GROUP BY bid) AS com 
ON blog.bid=com.bid`


		let SQLqueryBlog = await this.app.mysql.query(querySQL);




		let SQLtotal = await this.app.mysql.select('iantoo_blog',{
			where: {
				Draft: Draft
			},
			columns: ['bid'], // 要查询的表字段
		});

		let tatol = SQLtotal.length
		return { SQLqueryBlog , tatol };
	}




	//查询单独的某一篇文章
	async queryBlogInfo(bid){
		let queryblogContentSQL = await this.app.mysql.get('iantoo_blog', { bid: bid });
		return queryblogContentSQL;
	}




	//更新某一篇文章

	async upDataBlogInfo(blogContent){
		let thisDate = new Date(),
			updataDate = new Date(blogContent.date),
			type = 'blog';
		if(blogContent.blogLable.indexOf('tool') >= 0){
			type = 'tool'
		}
		let upDataBlogSQL = await this.app.mysql.update('iantoo_blog', {
			blogLable:blogContent.blogLable,
			title:blogContent.title,
			date:parseInt(updataDate.getTime() / 1000),
			editdate:parseInt(thisDate.getTime() / 1000),
			content:blogContent.content,
			OTCcontent:blogContent.OTCcontent,
			entype:'',
			navParentEn:'',
			Draft:blogContent.Draft,
			markDown:blogContent.markDown,
			blogPoster:blogContent.blogPoster,
			type:type,
		},{
			where: {
				bid: blogContent.bid
			}
		});

		return upDataBlogSQL;
	}





	//删除某一篇文章
	async deleteBlogServer(Dbid){
		let deleteBlog = await this.app.mysql.delete('iantoo_blog', {
			bid: Dbid,
		});
		return deleteBlog;
	}




}

module.exports = blog;