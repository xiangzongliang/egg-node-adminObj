layui.use(['element','jquery','layer','laypage'], function(element,$,layer,form,table){
	var element = layui.element,
		$ = layui.jquery,
		laypage = layui.laypage,






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
						page.render(data,opction.pageIndex);
					}
				})
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

					contentArea+='<p class="operating"><i commentid="40" class="reply_c">回复</i><i commentid="40" class="del_c">删除</i></p>'





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
			}
		}



	page.init({
		pageIndex:1,
		pageSize:10
	})

});


