layui.use(['element','jquery','layer','laypage'], function(element,$,layer,form,table){
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage,
		RAWData = ''






		page = {
			init:function (opction) {
				$.ajax({
					url:'/commentList',
					type:'POST',
					data:opction,
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					dataType:'json',
					success:function (data) {
						RAWData = data
						page.render(data,opction.pageIndex);
					}
				})
				return this;
			},






			render:function (data,pageIndex) {
				var commentList = data.msg,
					commentDOM = ''
				for(var cl = 0;cl<commentList.length;cl++){
					var replyDOM = '',
						reply = commentList[cl].reply;

					for(var rel = 0; rel < reply.length; rel++){
						replyDOM+=''
					}




					var contentArea = '';
					contentArea+='<p class="user_reply_info"><a>'+commentList[cl].appellation+'</a><time>'+commentList[cl].adddate+'</time></p>'
					contentArea+='<p class="user_reply_content">'+commentList[cl].content+'</p>'

					var replyList = commentList[cl].reply;

					for(var ril=0;ril<replyList.length;ril++){
						contentArea+='<p class="user_reply_info"><a>'+replyList[ril].ReplyName+'</a>回复了<a>'+replyList[ril].RepliedName+'</a><time>'+replyList[ril].addTime+'</time></p>'
						contentArea+='<p class="user_reply_content">'+replyList[ril].CPcontent+'</p>'
					}

					contentArea+='<p class="operating"><i class="reply_c" data="'+commentList[cl].id+'">回复</i><i class="del_c" data="'+commentList[cl].id+'">删除</i></p>'





					commentDOM += '<div class="layui-colla-item">\n' +
						'                <h2 class="layui-colla-title"><a class="C_appellation">'+ commentList[cl].appellation+'</a>在<time class="C_adddate">'+commentList[cl].adddate+'</time>评论了:<a target="_blank" href="http://www.xiangzongliang.com/blogContent?blog='+commentList[cl].bid+'" class="C_title">'+ commentList[cl].title +'</a></h2>\n' +
						'                <div class="layui-colla-content">'+contentArea+'</div>\n' +
						'            </div>'
				}

				$('.commont').html(commentDOM)
				element.init();




				//执行一个laypage实例
				laypage.render({
					elem: 'pageNumberDOM', //注意，这里的 test1 是 ID，不用加 # 号
					count: data.total, //数据总数，从服务端得到
					curr:pageIndex,
					jump: function(obj, first){

						//obj包含了当前分页的所有参数，比如：
						console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
						console.log(obj.limit); //得到每页显示的条数

						//首次不执行
						if(!first){
							page.init({
								pageIndex:obj.curr,
								pageSize:10
							})
						}
					}
				});
				page.listinFun()
			},


			//回复评论
			replyFun:function (pid,commentInfo) {
				layer.open({
					type: 1,
					title:'回复评论',
					area: ['600px', '400px'],
					btn: ['回复', '取消'],
					btnAlign: 'c',
					id:'replyPopup',
					content: $('.editpop').html(),
					yes: function(index, layero){

						var commentReply = $('#replyPopup .replyComtent').val(),
							postData = {},
							newdate = new Date();

						postData.pid = commentInfo.id
						postData.bid = commentInfo.bid
						postData.RepliedName = commentInfo.appellation
						postData.CPcontent = commentReply
						postData.addTime = parseInt(newdate.getTime()/1000)

						if(commentReply){
							$.ajax({
								url:'/commentReply',
								type:'POST',
								data:postData,
								headers: {
									'x-csrf-token':iantoo.getCookie()
								},
								dataType:'json',
								success:function (data) {
									layer.msg(data.msg);
									page.init({
										pageIndex:1,
										pageSize:10
									})
									layer.close(index); //如果设定了yes回调，需进行手工关闭
								}
							})
						}else{
							layer.msg('没有回复任何内容哦！')
						}

					}
				});
			},





			// 删除评论
			delComment:function (pid) {
				layer.confirm('你确定要删除这条评论吗？', {icon: 3, title:'提示'}, function(index){
					$.ajax({
						url:'/delcommentReply',
						type:'POST',
						data:{pid:pid},
						headers: {
							'x-csrf-token':iantoo.getCookie()
						},
						dataType:'json',
						success:function (data) {
							layer.msg(data.msg);
							page.init({
								pageIndex:1,
								pageSize:10
							})
							layer.close(index); //如果设定了yes回调，需进行手工关闭
						}
					})
				});
			},








			// 获取评论的相关信息
			getComment:function (pid) {
				var list = RAWData.msg
				for(var li=0;li<list.length;li++){
					if(list[li].id == pid){
						return list[li]
					}
				}
				return null;
			},





			//事件监听
			listinFun:function () {
				$('.reply_c').click(function () {
					var pid = this.getAttribute('data')
					var commentInfo = page.getComment(pid)
					page.replyFun(pid,commentInfo)
				})


				$('.del_c').click(function () {
					var pid = this.getAttribute('data')
					page.delComment(pid)
				})
			}

		}



	page.init({
		pageIndex:1,
		pageSize:10
	})

});


