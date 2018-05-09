const Controller = require('egg').Controller;



class bgmusic extends Controller {
	async init() {
		await this.ctx.render('bgmusic/bgmusic.html',{
			title:'背景音乐',
		});
	}



	async queryBgmusicList(){
		let queryBody = this.ctx.request.body;
		let musicList = await this.ctx.service.bgmusic.bgmusicList(queryBody);
		if(musicList){
			this.ctx.body = {
				status:true,
				code:0,
				msg:'返回成功',
				data:musicList.musicList,
				count:musicList.total //博客总条数
			};
		}else{
			this.ctx.body = {
				status:false,
				msg:'查询失败',
			};
		}
	}


	//添加背景音乐
	async addbgMisic(){
		let addmuBody = this.ctx.request.body;
		let addmusic = await this.ctx.service.bgmusic.addmusic(addmuBody);
		if(addmusic){
			this.ctx.body = {
				status:true,
				msg:'添加成功',
			};
		}
	}



	//更新背景音乐
	async updataMusic(){
		let updatamuBody = this.ctx.request.body;
		let updatamusic = await this.ctx.service.bgmusic.updatamusic(updatamuBody);
		if(updatamusic){
			this.ctx.body = {
				status:false,
				msg:'修改成功',
			};
		}
	}




	//删除背景音乐
	async delMusic(){
		let delmuBody = this.ctx.request.body;
		let delmusic = await this.ctx.service.bgmusic.delmusic(delmuBody);
		if(delmusic){
			this.ctx.body = {
				status:false,
				msg:'删除成功',
			};
		}
	}
}

module.exports = bgmusic;