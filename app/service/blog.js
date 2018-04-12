const Service = require('egg').Service;

class blog extends Service {

	async addblogServer(opction) {
		let SQLaddBlog = await this.app.mysql.insert('iantoo_blog', {
			blogLable:opction.blogLable,
			title:opction.title,
			date:opction.date,
			editdate:'',
			content:opction.content,
			entype:'',
			navParentEn:'',
			Draft:opction.Draft,
			markDown:opction.markDown,
			blogPoster:opction.blogPoster
		});
		return SQLaddBlog;
	}


}

module.exports = blog;