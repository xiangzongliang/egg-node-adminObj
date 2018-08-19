'use strict';

const Controller = require('egg').Controller;

class webpagesql extends Controller {

	//归档列表
	async QueryArchiving() {
		let queryAhvServer = await this.ctx.service.webServersql.queryAhvServer();

		let timeAxis = [],
			titleList = [],
			dateFun = (datenum) => {
				let da = new Date(datenum * 1000)
				let year = da.getFullYear(),
					month = da.getMonth() + 1,
					date = da.getDate();
				if(month<10){
					month = '0'+month
				}
				if(date<10){
					date = '0'+date
				}
				return {
					getTime:year+'-'+month,
					getRAWtime:year+'-'+month+'-'+date
				}
			};


		for (let ti in queryAhvServer) {
			let isDate = true,
				getTimeVal = dateFun(queryAhvServer[ti].date).getTime;
			titleList.push({
				creatTime:dateFun(queryAhvServer[ti].date).getRAWtime,
				date:getTimeVal,
				id:queryAhvServer[ti].bid,
				title:queryAhvServer[ti].title
			})


			for(let mi in timeAxis){
				if(timeAxis[mi].months == getTimeVal){
					isDate = false
				}
			}

			if(isDate){
				timeAxis.push({
					months:getTimeVal
				})
			}
		}


		this.ctx.body = {
			status: true,
			timeAxis: timeAxis,
			titleList: titleList
		};

	}




	//QQ登陆
	async userQQlogin(){
		this.ctx.body = {
			status: false,
			msg: '用户未登录',
		};

	}



	//获取音乐播放列表
	async getMusicList(){
		let queryMusicServer = await this.ctx.service.webServersql.queryMusic();
		if(queryMusicServer){
			this.ctx.body = {
				status: true,
				msg: queryMusicServer
			};
		}else{
			this.ctx.body = {
				status: false,
				msg: []
			};
		}
	}




	//博客列表
	async blogList(){
		let pageInfo = this.ctx.request.body;
		let blogListServerSQL = await this.ctx.service.webServersql.queryblogListServer(pageInfo),
			blogListServer = blogListServerSQL.queryblogList, //博客的列表
			total = blogListServerSQL.blogtotale.length,    //博客的总数
			blogList = [],
			contentFun = (content) =>{//正则过滤分页符和去掉html标签
				if(content){
					let RDOM = content.split(`<hr style="page-break-after:always;" class="page-break editormd-page-break" />`)
					let returnDOM = RDOM[0].replace(/<[^>]+>|\[TOC]/g,"");
					return returnDOM
				}else{
					return '还没有更新内容哦！';
				}

			};


		for(let bi in blogListServer){
			let domContent = contentFun(blogListServer[bi].OTCcontent)
			blogList.push({
				id:blogListServer[bi].bid,
				blogPoster:blogListServer[bi].blogPoster,
				content:domContent,
				discuss:blogListServer[bi].discuss,
				flow:blogListServer[bi].flow,
				labelist:JSON.parse(blogListServer[bi].blogLable),
				startDate:this.ctx.service.webServersql.timeConversion(blogListServer[bi].date),
				title:blogListServer[bi].title,
			})
		}




		if(blogListServer){
			this.ctx.body = {
				status: true,
				msg: blogList,
				total:total
			};
		}else{
			this.ctx.body = {
				status: false,
				msg: [],
				total:0
			};
		}
	}




	//博客详情
	async blogContent(){
		let bid = this.ctx.request.body;
		let blogContent = await this.ctx.service.webServersql.blogContent(bid)
		if(blogContent){
			this.ctx.body = {
				status: true,
				msg: blogContent.queryblogContentInfo,
				cList:blogContent.blogComment,
				reply:blogContent.blogCommentReply
			};
		}else{
			this.ctx.body = {
				status: false,
				msg: [],
				cList:[],
				reply:[]
			};
		}
	}




	//添加评论
	async Addcomment(){
		let commentData = this.ctx.request.body;
		if(!commentData.bid){
			this.ctx.body = {
				status: false,
				msg: 'this not or bid'
			}
			return;
		}


		// bid: data.bid,
		// 	content:data.content,
		// 	adddate:timeC,
		// 	appellation:data.username,
		// 	url:data.userUrl,
		// 	isQQuser:data.islogin == '' ? 'no' : 'yes'

		//通过bid 获取博客的信息
		let getBlogInfo = await this.ctx.service.webServersql.emailQueryBlogInfo(commentData.bid)
		//添加用户评论
		let addblogComment = await this.ctx.service.webServersql.addblogComment(commentData)

		if(getBlogInfo){
			//触发邮件推送
			try{
				const result = await this.ctx.curl('http://localhost/emailSend/', {
					// 必须指定 method
					method: 'POST',
					// 通过 contentType 告诉 HttpClient 以 JSON 格式发送
					contentType: '',
					data: {
						resMail:'826463893@qq.com',
						sendTitle:`${commentData.username} 评论了文章 ${getBlogInfo[0].title}`,
						sendContent:`<div style="width: 100%;position: relative;">
						<a style="text-decoration: none;" href="http://www.xiangzongliang.com" target="_blank"><h2 style="text-align: center;padding-top: 20px;font-size: 22px;font-weight: 300;color: #35b9ed;">言图网</h2></a>
						<img style="width: 100%;padding: 0px 30% 20px 30%;box-sizing: border-box;" src="http://poster.xiangzongliang.com/iantoologo.png">
						<p style="color: #555;
							font-size:14px;
							font-weight: 400;
							line-height: 1.2rem;padding: 15px 20px;border-bottom: 1px solid #c4c4c4;margin:0px; background: #ececec;border-radius: 5px 5px 0px 0px;">用户 <span style="color:#ff8800">${commentData.username}</span> 对文章 <a style="color:#ff8800;text-decoration: none;" href="http://www.xiangzongliang.com/blogContent?b=${commentData.bid}" target="_blank">${getBlogInfo[0].title}</a>写下了评论:</p>
						<p style="color: #666;
						font-size:14px;
						font-weight: 300;
						line-height: 2rem;padding: 5px 20px 15px 20px;margin:0px; background: #ececec;border-radius:0px 0px 5px 5px;">${commentData.content}</p>
				
						<p style="text-align: center; padding: 20px 20px; color: #c4c4c4; font-size: 12px;font-weight: 300;">
							* 感谢您的评论 * <br/> - 祝您开心每一天 - <br/> 邮件内容为推送内容,请勿回复。
						</p>
						
					</div>`,
						tagName:'resEmail', //resEmail -> 有人评论 || sendEmail -> 作者回复
					},
					// 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
					dataType: 'json',

				});
			}catch (err){
				console.log(err)
			}
		}



		


		
		if(addblogComment){
			this.ctx.body = {
				status: true,
				msg: '评论成功'
			}
		}else{
			this.ctx.body = {
				status: false,
				msg: '评论失败'
			}
		}
	}




	// 获取导航列表
	async getNavList(){
		let querynavList = await this.ctx.service.webServersql.querynavList()
		this.ctx.body = {
			status: false,
			msg: querynavList
		}
	}

}


module.exports = webpagesql;
