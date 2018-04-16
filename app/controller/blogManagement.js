const Controller = require('egg').Controller;



class blogManagement extends Controller {
	async init() {
		await this.ctx.render('blogManag/blogManag.html',{
			title:'博客管理'
		});
	}




	async blogListCtl(){
		let queryBody = this.ctx.request.body;

		let opction = {
				offset:(queryBody.page - 1) * 10,
				limit:queryBody.limit,
				drafts:false
			}






		let queryblogList = await this.ctx.service.blog.queryBlogServer(opction);

		let fmtDate = (timeStamp)=>{
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


		let blogListRaw = queryblogList.SQLqueryBlog,
			callBackBlogList = []

		for(let bi in blogListRaw){
			var newDate = fmtDate(blogListRaw[bi].date)
			callBackBlogList.push({
				bid:blogListRaw[bi].bid,
				date:newDate,
				discuss:blogListRaw[bi].discuss,
				flow:blogListRaw[bi].flow,
				title:blogListRaw[bi].title
			})
		}

		

		this.ctx.body = {
			status:true,
			code:0,
			msg:'返回成功',
			data:callBackBlogList,
			count:queryblogList.tatol //博客总条数
		};

	}




	// 删除博客
	async deleteBlog(){
		let delBid = this.ctx.request.body;
		let Delblog = await this.ctx.service.blog.deleteBlogServer(delBid.bid);

		if(Delblog){
			this.ctx.body = {
				status:true,
				msg:'删除成功'
			};
		}else{
			this.ctx.body = {
				status:false,
				msg:'删除失败'
			};
		}
	}

}

module.exports = blogManagement;