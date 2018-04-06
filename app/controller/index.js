'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async home() {

      let uid = this.ctx.session.uid

	  let SQLData = await this.app.mysql.select('iantoo_seting',{
	    where:{
	      uid:uid
        }
      });
      await this.ctx.render('index/index.html');
  }
}

module.exports = HomeController;
