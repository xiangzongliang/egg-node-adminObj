const Service = require('egg').Service;

class blog extends Service {


	//添加博客文章
	async addblogServer(opction) {
		let SQLaddBlog = await this.app.mysql.insert('iantoo_blog', {
			blogLable:opction.blogLable,
			title:opction.title,
			date:opction.date,
			editdate:0,
			content:opction.content,
			entype:'',
			navParentEn:'',
			Draft:opction.Draft,
			markDown:opction.markDown,
			blogPoster:opction.blogPoster
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


		let querySQL = `SELECT blog.bid,ifnull(com.discuss,0) AS discuss,blog.title,blog.date,blog.flow
FROM (SELECT bid,title,date,flow FROM iantoo_blog WHERE Draft='n' ORDER BY bid DESC LIMIT ${parseInt(opction.offset)},${parseInt(opction.limit)}) AS blog 
LEFT JOIN (SELECT COUNT(bid) AS discuss,bid FROM iantoo_comment GROUP BY bid) AS com 
ON blog.bid=com.bid`

		let SQLqueryBlog = await this.app.mysql.query(querySQL);




		let SQLtotal = await this.app.mysql.select('iantoo_blog',{
			where: {
				Draft: 'n'
			},
			columns: ['bid'], // 要查询的表字段
		});

		let tatol = SQLtotal.length
		return { SQLqueryBlog , tatol };
	}




}

module.exports = blog;