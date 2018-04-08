'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

	//进去首页
	  async home() {

	      let uid = this.ctx.session.uid

		  let querySeting = await this.ctx.service.home.querySeting(uid);
		  querySeting[0].title = '基础配置'
	      await this.ctx.render('home/home.html',querySeting[0]);
	  }

	  //修改阿里云配置
	  async editAliyunKey(){
		  let postData = this.ctx.request.body;
		  let editAliyun = await this.ctx.service.home.editAliyun(postData);

		  if(editAliyun){
			  this.ctx.body = {
				  status:true,
				  msg:'修改成功'
			  };
		  }else{
			  this.ctx.body = {
				  status:false,
				  msg:'修改失败'
			  };
		  }



	  }

	  //修改七牛云配置
	  async editQiniuyun(){
		  let postData = this.ctx.request.body;
		  let editqiniuyun = await this.ctx.service.home.editqiniuyun(postData);

		  if(editqiniuyun){
			  this.ctx.body = {
				  status:true,
				  msg:'修改成功'
			  };
		  }else{
			  this.ctx.body = {
				  status:false,
				  msg:'修改失败'
			  };
		  }
	  }
}

module.exports = HomeController;
