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
		let SQLqueryBlog = await this.app.mysql.select('iantoo_blog',{
			where: {
				Draft: 'n'
			}
		});

		let tatol = SQLqueryBlog.length
		return { SQLqueryBlog , tatol };
	}




}

module.exports = blog;