const Service = require('egg').Service;

class blog extends Service {


	//获取背景音乐列表
	async bgmusicList(opction) {
		let limit = parseInt(opction.limit),
			offset = parseInt((opction.page-1) * limit);
		let musicList = await this.app.mysql.select('iantoo_backgroundmusic',{
			orders: [['muid','desc']], // 排序方式
			limit: limit, // 返回数据量
			offset: offset, // 数据偏移量
		});
		let musicListTotal = await this.app.mysql.select('iantoo_backgroundmusic',{
			columns: ['muid'],
		}), total = musicListTotal.length;
		return { musicList,total };
	}



	//添加背景音乐
	async addmusic(opction){
		let addmusicSQL = await this.app.mysql.insert('iantoo_backgroundmusic',{
			src:opction.src,
			songTitle:opction.songTitle,
			author:opction.author
		})
		return addmusicSQL;
	}



	//更新音乐文件
	async updatamusic(opction){
		let updataMusicSQL = await this.app.mysql.update('iantoo_backgroundmusic',{
			src:opction.src,
			songTitle:opction.songTitle,
			author:opction.author
		},{
			where: {
				muid: parseInt(opction.muid)
			}
		})
		return updataMusicSQL;
	}





	//删除BG music文件
	async delmusic(opction){
		let deleteMusic = await this.app.mysql.delete('iantoo_backgroundmusic', {
			muid: parseInt(opction.muid),
		});
		return deleteMusic;
	}










}

module.exports = blog;