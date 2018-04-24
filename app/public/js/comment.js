layui.use(['element','jquery','layer','form','table'], function(element,$,layer,form,table){
	var element = layui.element,




		page = {
			init:function () {
				$.ajax({
					url:'/commentList',
					type:'POST',
					headers: {
						'x-csrf-token':iantoo.getCookie()
					},
					data:'',
					dataType:'json',
					success:function (data) {
						page.render(data);
					}
				})
			},






			render:function (data) {
				var commentList = data.msg,
					commentDOM = ''
				for(var cl = 0;cl<commentList.length;cl++){
					var replyDOM = '',
						reply = commentList[cl].reply;

					for(var rel = 0; rel < reply.length; rel++){
						replyDOM+=''
					}



					commentDOM += '<div class="layui-colla-item">\n' +
						'                <h2 class="layui-colla-title"><a class="C_appellation">'+ commentList[cl].appellation+'</a>在<time class="C_adddate">'+commentList[cl].adddate+'</time></h2>\n' +
						'                <div class="layui-colla-content">内容区域</div>\n' +
						'            </div>'
				}

				$('.commont').html(commentDOM)
				element.init();
			}
		}



	page.init()

});


