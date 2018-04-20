'use strict';

const Controller = require('egg').Controller;

class classCTL extends Controller {

	//进去首页
	async init() {
		// await this.ctx.render('drafts/drafts.html',{
		// 	title:'草稿箱'
		// });
		let parentList = await this.ctx.service.classManagSQL.queryParentList();

		await this.ctx.render('classCTL/classCTL.html',{
			title:'分类管理',
			parentList:parentList
		});
	}







	//查询分类列表
	async queryClassList(){
		let queryClass = await this.ctx.service.classManagSQL.queryClass();

		this.ctx.body = {
			status:true,
			code:0,
			msg:'返回成功',
			data:queryClass,
			count:queryClass.length
		};
	}







	//编辑或新增分类
	async editOrAddClass(){
		let classPostBody = this.ctx.request.body;
		if(classPostBody.status == 'add'){
			let addClassList = await this.ctx.service.classManagSQL.addClass(classPostBody);
			if(addClassList){
				this.ctx.body = {
					status:true,
					msg:'添加成功'
				};
			}else{
				this.ctx.body = {
					status:false,
					msg:'添加失败'
				};
			}
		}else{
			let editClassList = await this.ctx.service.classManagSQL.editClass(classPostBody);
			if(editClassList){
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


}


module.exports = classCTL;
