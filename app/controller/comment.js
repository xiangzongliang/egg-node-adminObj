'use strict';

const Controller = require('egg').Controller;

class comment extends Controller {

	//进去首页
	async init() {
		await this.ctx.render('comment/comment.html',{
			title:'评论管理'
		});
	}



	async getCommentList(){
		let queryBody = this.ctx.request.body;
		let queryCommentList = await this.ctx.service.comment.queryCommentList(queryBody);


		let commentList = queryCommentList.commentList,
			replyCommentList = queryCommentList.replyCommentList,
			callbackList = [],
			replyList;
		for(let cl in commentList){
			replyList = [];
			for(let rcl in replyCommentList){
				if(replyCommentList[rcl].pid == commentList[cl].pid ){
					replyList.push(replyCommentList[rcl])
				}
			}
			commentList[cl].reply = replyList;
			callbackList.push(commentList[cl])

		}
		this.ctx.body = {
			status:true,
			msg:callbackList,
		};

	}

}


module.exports = comment;
