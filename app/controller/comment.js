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
			addReply = await this.ctx.service.comment.addReply(replyData),
			getBlogInfo = await this.ctx.service.webServersql.emailQueryBlogInfo(replyData.bid),	//获取博客的title,用于邮箱推送
			getEmail = await this.ctx.service.comment.getEmail(replyData.pid);

			//开始邮件推送
			if(getEmail && getEmail[0] && getEmail[0].url && getBlogInfo){
				//触发邮件推送
				try{
					const result = await this.ctx.curl('http://127.0.0.1:8090/emailSend/', {
						// 必须指定 method
						method: 'POST',
						// 通过 contentType 告诉 HttpClient 以 JSON 格式发送
						contentType: '',
						data: {
							resMail:getEmail[0].url,
							sendTitle:`言图网 - 作者回复了您在《${getBlogInfo[0].title}》文章中的评论 `,
							sendContent:`<div style="width: 100%;position: relative;">
							<a style="text-decoration: none;" href="http://www.xiangzongliang.com" target="_blank"><h2 style="text-align: center;padding-top: 20px;font-size: 20px;font-weight: 300;color: #35b9ed;">来自言图网的回信</h2></a>
							<img style="width: 100%;padding: 0px 30% 20px 30%;box-sizing: border-box;" src="http://poster.xiangzongliang.com/iantoologo.png">
							<p style="color: #555;
								font-size:14px;
								font-weight: 400;
								line-height: 1.2rem;padding: 15px 20px;border-bottom: 1px solid #c4c4c4;margin:0px; background: #ececec;border-radius: 5px 5px 0px 0px;"><span style="color:#ff8800">@${getEmail[0].appellation}</span> 您好！言图网 - 作者对你在 <a style="color:#ff8800;text-decoration: none;" href="http://www.xiangzongliang.com/blogContent?b=${replyData.bid}" target="_blank">《 ${getBlogInfo[0].title} 》</a>一文中的评论有了回复，内容如下:</p>
							<p style="color: #666;
							font-size:14px;
							font-weight: 300;
							line-height: 2rem;padding: 5px 20px 15px 20px;margin:0px; background: #ececec;border-radius:0px 0px 5px 5px;">${replyData.CPcontent}</p>
					
							<p style="text-align: center; padding: 20px 20px; color: #c4c4c4; font-size: 12px;font-weight: 300;">
								-- 感谢您的评论 -- <br/> ** 祝您开心每一天 **<br/> 邮件内容为推送内容 <a style="color:#ff3300">请勿回复</a>
							</p>
							
						</div>`,
							tagName:'sendEmail', //resEmail -> 有人评论 || sendEmail -> 作者回复
						},
						// 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
						dataType: 'json',

					});
				}catch (err){
					console.log(err)
				}
			}

			//接口返回数据
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
