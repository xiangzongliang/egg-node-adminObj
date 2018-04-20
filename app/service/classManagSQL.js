const Service = require('egg').Service;

class classmanag extends Service {
	async queryClass() {
		let SQLqueryClass = await this.app.mysql.select('iantoo_nav');
		return SQLqueryClass;
	}

	async queryParentList(){
		let SQLqueryClass = await this.app.mysql.select('iantoo_nav',{
			where: {
				parent: 1
			},
		});
		return SQLqueryClass;
	}





	//添加分类
	async addClass(opction){
		let addClassSQL = await this.app.mysql.insert('iantoo_nav',{
			sort: opction.sort,
			Cname:opction.Cname,
			Ename:opction.Ename,
			parent:opction.parentName?1:2,
			parentEn:opction.parentName,
			display:opction.showAndHiden,
			openNewPage:opction.openNewPage,
			openNewWindow:opction.openNewWindow
		});
		return addClassSQL;
	}





	//编辑分类

	async editClass(opction){
		let editClassSQL = await this.app.mysql.update('iantoo_nav',{
			sort: opction.sort,
			Cname:opction.Cname,
			Ename:opction.Ename,
			parent:opction.parentName?1:2,
			parentEn:opction.parentName,
			display:opction.showAndHiden,
			openNewPage:opction.openNewPage,
			openNewWindow:opction.openNewWindow
		},{
			where: {
				nid: opction.nid
			},
		});
		return editClassSQL;
	}



}

module.exports = classmanag;