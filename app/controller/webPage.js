'use strict';

const Controller = require('egg').Controller;

class webpagesql extends Controller {

	//进去首页
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
				return {
					getTime:year+''+month,
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
		let blogListServerSQL = await this.ctx.service.webServersql.blogListServer(pageInfo),
			blogListServer = blogListServerSQL.queryblogList, //博客的列表
			total = blogListServerSQL.blogtotale.length,    //博客的总数
			blogList = [],
			contentFun = (content) =>{
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
				discuss:0,
				flow:blogListServer[bi].flow,
				labelist:JSON.parse(blogListServer[bi].blogLable),
				startDate:blogListServer[bi].date,
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

}


module.exports = webpagesql;
