'use strict';

const Controller = require('egg').Controller;

class comment extends Controller {

	//进去首页
	async init() {
		await this.ctx.render('comment/comment.html',{
			title:'评论管理'
		});
	}


	//获取评论列表
	async getCommentList(){
		let queryBody = this.ctx.request.body,
			queryCommentListRAW = await this.ctx.service.comment.queryCommentList(queryBody);
		let queryCommentList = queryCommentListRAW.commentList




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


		let postMSG = [],
			status = false;

		let replyData = [];  //评论的回复列表
		forqcl:for(let ri in queryCommentList){
			status = false;

			for(let pi in postMSG){
				if(postMSG[pi].id == queryCommentList[ri].pid){
					postMSG[pi].reply.push({
						'CPcontent':queryCommentList[ri].CPcontent,
						'RepliedName':queryCommentList[ri].RepliedName,
						'ReplyName':queryCommentList[ri].ReplyName,
						'addTime':fmtDate(queryCommentList[ri].addTimeR),
						'bid':queryCommentList[ri].bid,
						'cpid':queryCommentList[ri].cpid,
						'pid':queryCommentList[ri].pid,
					})
					status = true;
				}
			}



			if(status === false){
				if(queryCommentList[ri].cpid){
					replyData.push({
						'CPcontent':queryCommentList[ri].CPcontent,
						'RepliedName':queryCommentList[ri].RepliedName,
						'ReplyName':queryCommentList[ri].ReplyName,
						'addTime':fmtDate(queryCommentList[ri].addTimeR),
						'bid':queryCommentList[ri].bid,
						'cpid':queryCommentList[ri].cpid,
						'pid':queryCommentList[ri].pid,
					})
				}
				postMSG.push({
					'adddate':fmtDate(queryCommentList[ri].adddate),
					'appellation':queryCommentList[ri].appellation,
					'bid':queryCommentList[ri].bid,
					'title':queryCommentList[ri].title,
					'content':queryCommentList[ri].content,
					'id':queryCommentList[ri].pid,
					'reply':replyData
				})
				replyData = []
			}else{

				continue forqcl;
			}





		}


		this.ctx.body = {
			status:true,
			msg:postMSG,
			total:queryCommentListRAW.total
		};

	}



	//添加回复
	async commentReply(){
		let replyData = this.ctx.request.body,
			addReply = await this.ctx.service.comment.addReply(replyData);
		if(addReply){
			this.ctx.body = {
				status: true,
				msg: '回复成功'
			};
		}else{
			this.ctx.body = {
				status: true,
				msg: '回复失败'
			};
		}
	}



	// 删除评论--影藏
	async delcommentReply(){
		let delComment = this.ctx.request.body,
			delReply = await this.ctx.service.comment.delReply(delComment);
		if(delReply){
			this.ctx.body = {
				status: true,
				msg: '删除成功'
			};
		}else{
			this.ctx.body = {
				status: true,
				msg: '删除失败'
			};
		}
	}
}


module.exports = comment;
