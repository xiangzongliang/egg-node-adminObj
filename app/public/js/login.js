layui.use(['element','jquery','layer'], function(element,$){
	var element = layui.element,
		layer = layui.layer,



		page = {
			init:function () {
				return this;
			},
			listen:function () {
				$('.login-btn').click(function () {
					var postData = {
						userName:$('.userName').val(),
						password:$('.password').val()
					}

					if(postData.userName == ''){
						layer.msg('用户名不能为空');
						return;
					}else if(postData.password == ''){
						layer.msg('密码不能为空');
						return;
					}
					$.ajax({
						url:'/login',
						type:'POST',
						headers: {
							'x-csrf-token':iantoo.getCookie()
						},
						data:postData,
						dataType:'json',
						success:function (data) {
							if(data.status == true){
								window.location.href='/';
							}else{
								layer.msg(data.msg);
							}
						}
					})
				})
			}
		}


		page.init().listen();

});


