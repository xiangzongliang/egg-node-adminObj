'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
	const islogin = app.middleware.islogin();

	// 主页
    router.get('/', islogin,controller.index.home);
	router.get('/logout', islogin,controller.index.logout); //退出登录
	router.post('/editAliyunKey',islogin, controller.index.editAliyunKey); //修改阿里云的Key
	router.post('/editQiniuyun',islogin, controller.index.editQiniuyun); //修改七牛云的Key
	router.post('/editslogan',islogin, controller.index.editSlogan); //修改标语
	router.post('/editsPassword', islogin,controller.index.editsPassword); //修改密码
    // 登陆页面
	router.get('/login',islogin, controller.login.login);
	router.post('/login', islogin,controller.login.userLogin);
	// 添加博客
	router.get('/addblog',islogin, controller.addblog.init);
	router.post('/addblog',islogin, controller.addblog.addBlogCtl);
	//博客管理
	router.get('/blogManagement',islogin, controller.blogManagement.init);
	router.post('/queryblogList',islogin, controller.blogManagement.blogListCtl);
	router.post('/deleteBlog',islogin, controller.blogManagement.deleteBlog);
	// 编辑博客
	router.get('/editBlog',islogin, controller.editBlog.init);
	router.post('/queryBlog',islogin, controller.editBlog.queryBlog);
	router.post('/updataBlog',islogin, controller.editBlog.updataBlog);
	//草稿箱
	router.get('/drafts',islogin, controller.drafts.init);
	router.post('/queryDraftsList',islogin, controller.drafts.blogListCtl);
	//获取七牛云token
	router.post('/getPosterToken',islogin, controller.qiniu.getPosterToken); //上传海报的token
	router.post('/getImageToken',islogin, controller.qiniu.getImageToken); //上传图片的token
	router.post('/getmusicToken',islogin, controller.qiniu.getMusicToken); //上传背景音乐的token
	//分类模块
	router.get('/classFTN',islogin, controller.classFTN.init);
	router.post('/classFTN',islogin, controller.classFTN.queryClassList);
	router.post('/editOrAddClass',islogin, controller.classFTN.editOrAddClass);
	// 评论管理模块
	router.get('/comment',islogin,controller.comment.init)
	router.post('/commentList',islogin,controller.comment.getCommentList)
	router.post('/commentReply',islogin,controller.comment.commentReply)
	router.post('/delcommentReply',islogin,controller.comment.delcommentReply)
	//背景音乐设置
	router.get('/bgmusic',islogin,controller.bgmusic.init)
	router.post('/bgmusicList',islogin,controller.bgmusic.queryBgmusicList)
	router.post('/addbgMisic',islogin,controller.bgmusic.addbgMisic)
	router.post('/updataMusic',islogin,controller.bgmusic.updataMusic)
	router.post('/delMusic',islogin,controller.bgmusic.delMusic)








	//  网页前端你的所有接口--------------------------------------------------------------------------
	router.post('/iantooData/QueryArchiving/',controller.webPage.QueryArchiving)
	router.post('/iantooData/userQQlogin/',controller.webPage.userQQlogin)
	router.post('/iantooData/getMusicList/',controller.webPage.getMusicList)
	router.post('/iantooData/blogList/',controller.webPage.blogList)
	router.post('/iantooData/blogContent/',controller.webPage.blogContent)
	router.post('/iantooData/Addcomment/',controller.webPage.Addcomment)
	router.post('/iantooData/getNavList/',controller.webPage.getNavList)






};
