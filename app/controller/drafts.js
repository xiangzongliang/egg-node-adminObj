'use strict';

const Controller = require('egg').Controller;

class draftsCTL extends Controller {

	//进去首页
	async init() {
		await this.ctx.render('drafts/drafts.html',{
			title:'草稿箱'
		});
	}



	// 查询草稿箱的所有博客内容
	async blogListCtl() {
		let queryBody = this.ctx.request.body;

		let opction = {
			offset: (queryBody.page - 1) * 10,
			limit: queryBody.limit,
			drafts:true
		}


		let queryblogList = await this.ctx.service.blog.queryBlogServer(opction);

		let fmtDate = (timeStamp) => {
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
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		}


		let blogListRaw = queryblogList.SQLqueryBlog,
			callBackBlogList = []

		for (let bi in blogListRaw) {
			var newDate = fmtDate(blogListRaw[bi].date)
			callBackBlogList.push({
				bid: blogListRaw[bi].bid,
				date: newDate,
				discuss: blogListRaw[bi].discuss,
				flow: blogListRaw[bi].flow,
				title: blogListRaw[bi].title
			})
		}


		this.ctx.body = {
			status: true,
			code: 0,
			msg: '返回成功',
			data: callBackBlogList,
			count: queryblogList.tatol //博客总条数
		};
	}

}


module.exports = draftsCTL;
